import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/server";
import { STORAGE_BUCKET } from "@/lib/supabase/env";
import { buildObjectPath, validateUpload, MAX_UPLOAD_BYTES } from "@/lib/storage";

/**
 * Uploads to the public media bucket.
 *
 * Writes go through this route rather than straight from the browser so the
 * admin check happens on the server, before the service-role client is ever
 * constructed. The bucket is public to read and closed to write; nothing
 * unauthenticated reaches the service-role key.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected a multipart form upload" },
      { status: 400 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file was uploaded" }, { status: 400 });
  }

  const rejection = validateUpload({ type: file.type, size: file.size });
  if (rejection) {
    return NextResponse.json(
      { error: rejection.reason, details: [{ field: "file", message: rejection.reason }] },
      // 413 for a file that is merely too big, so a client can tell "wrong
      // kind of thing" from "right kind, too large".
      { status: file.size > MAX_UPLOAD_BYTES ? 413 : 400 },
    );
  }

  const folder = sanitiseFolder(form.get("folder"));
  const objectPath = buildObjectPath(file.name, file.type, folder);

  try {
    const supabase = createAdminClient();

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(objectPath, file, {
        contentType: file.type,
        // Never overwrite: the path carries a unique suffix, so a collision
        // would mean something is wrong rather than something to paper over.
        upsert: false,
        cacheControl: "31536000",
      });

    if (error) {
      console.error("Supabase storage upload failed:", error);
      return NextResponse.json(
        { error: "Could not store that image. Try again in a moment." },
        { status: 502 },
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath);

    return NextResponse.json({ path: objectPath, url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("Error uploading to storage:", error);
    return NextResponse.json(
      { error: "Storage is not configured correctly." },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/uploads?path=projects/foo.png — removes one object.
 */
export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  const path = request.nextUrl.searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "A `path` is required" }, { status: 400 });
  }

  // The path comes from a request, and the service-role client below ignores
  // row-level security — so a traversal segment must not reach it.
  if (path.includes("..") || path.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path]);

    if (error) {
      console.error("Supabase storage delete failed:", error);
      return NextResponse.json(
        { error: "Could not delete that image." },
        { status: 502 },
      );
    }

    return NextResponse.json({ deleted: path }, { status: 200 });
  } catch (error) {
    console.error("Error deleting from storage:", error);
    return NextResponse.json(
      { error: "Storage is not configured correctly." },
      { status: 500 },
    );
  }
}

/** Folders are an allowlist: the client picks a bucket area, not a path. */
function sanitiseFolder(value: FormDataEntryValue | null): string {
  const allowed = ["projects", "posts", "profile"];
  const folder = typeof value === "string" ? value : "";
  return allowed.includes(folder) ? folder : "projects";
}
