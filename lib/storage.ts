/**
 * Rules for what may go into the public media bucket.
 *
 * Shared by the browser (to reject a file before uploading it) and the route
 * (to reject one that was sent anyway). The route's copy is the one that
 * counts — the client-side check only exists to save a doomed round trip.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * An allowlist rather than a blocklist, and images only: this bucket is served
 * publicly, so anything that a browser might execute has no business in it.
 */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
] as const;

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export interface UploadRejection {
  reason: string;
}

/** Returns null when the file is acceptable, or the reason it is not. */
export function validateUpload(file: {
  type: string;
  size: number;
}): UploadRejection | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return { reason: "Only JPEG, PNG, WebP, AVIF and GIF images can be uploaded." };
  }

  if (file.size <= 0) {
    return { reason: "That file is empty." };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      reason: `Images must be under ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}MB.`,
    };
  }

  return null;
}

/**
 * Builds the object path for an upload.
 *
 * The stored name is derived, never taken from the client: an uploaded
 * `../../etc/passwd` or a 400-character unicode filename would otherwise
 * become a storage key. The original name survives only as a readable slug.
 */
export function buildObjectPath(
  originalName: string,
  contentType: string,
  folder = "projects",
): string {
  const extension = EXTENSION_BY_TYPE[contentType] ?? "bin";

  const slug =
    originalName
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "image";

  const unique = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  return `${folder}/${slug}-${unique}.${extension}`;
}
