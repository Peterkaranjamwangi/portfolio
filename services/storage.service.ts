import { ApiError, normaliseFieldErrors } from "@/lib/api-client";

export interface UploadedImage {
  /** Object path within the bucket, needed to delete it later. */
  path: string;
  /** Public URL, safe to store on a Project row and render directly. */
  url: string;
}

export type UploadFolder = "projects" | "posts" | "profile";

/**
 * Image uploads to the Supabase bucket, via this app's admin-guarded route.
 *
 * This is the one service that does not use the shared HTTP client: the client
 * serialises bodies as JSON, and an upload has to be `multipart/form-data` so
 * the file streams instead of being base64-inflated by a third. Failures are
 * still normalised into `ApiError`, so callers handle them identically.
 */
export const storageService = {
  async upload(file: File, folder: UploadFolder = "projects"): Promise<UploadedImage> {
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);

    let response: Response;
    try {
      response = await fetch("/api/uploads", { method: "POST", body });
    } catch {
      throw new ApiError("Could not reach the server. Check your connection.", 0);
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new ApiError(
        typeof payload?.error === "string" ? payload.error : "Upload failed",
        response.status,
        normaliseFieldErrors(payload?.details),
      );
    }

    return payload as UploadedImage;
  },

  async remove(path: string): Promise<void> {
    const response = await fetch(`/api/uploads?path=${encodeURIComponent(path)}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      throw new ApiError(
        typeof payload?.error === "string" ? payload.error : "Delete failed",
        response.status,
      );
    }
  },
};
