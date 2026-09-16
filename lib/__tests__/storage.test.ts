import { describe, expect, it } from "vitest";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  buildObjectPath,
  validateUpload,
} from "@/lib/storage";

/**
 * These guard the upload path, which is the one place a request gets to
 * influence what lands in the public bucket. The rules are enforced again on
 * the server, but this is where they are stated.
 */
describe("validateUpload", () => {
  it("accepts every allowed image type", () => {
    for (const type of ALLOWED_IMAGE_TYPES) {
      expect(validateUpload({ type, size: 1024 })).toBeNull();
    }
  });

  it("rejects anything that is not an allowed image", () => {
    // The dangerous cases: things a browser might execute if served back.
    for (const type of ["text/html", "image/svg+xml", "application/javascript", ""]) {
      expect(validateUpload({ type, size: 1024 })).not.toBeNull();
    }
  });

  it("rejects an empty file", () => {
    expect(validateUpload({ type: "image/png", size: 0 })).not.toBeNull();
  });

  it("accepts a file exactly at the limit but not one byte over", () => {
    expect(validateUpload({ type: "image/png", size: MAX_UPLOAD_BYTES })).toBeNull();
    expect(
      validateUpload({ type: "image/png", size: MAX_UPLOAD_BYTES + 1 }),
    ).not.toBeNull();
  });
});

describe("buildObjectPath", () => {
  it("never lets a crafted filename escape the folder", () => {
    const path = buildObjectPath("../../../etc/passwd.png", "image/png");
    expect(path).not.toContain("..");
    expect(path.startsWith("projects/")).toBe(true);
  });

  it("strips characters that have meaning in a path or URL", () => {
    const path = buildObjectPath("a/b?c#d e%f.png", "image/png");
    const name = path.slice("projects/".length);
    expect(name).toMatch(/^[a-z0-9-]+\.png$/);
  });

  it("takes the extension from the content type, not the filename", () => {
    // A .png that is actually declared as html must not be stored as .html.
    expect(buildObjectPath("evil.html", "image/png").endsWith(".png")).toBe(true);
    expect(buildObjectPath("photo.png", "image/webp").endsWith(".webp")).toBe(true);
  });

  it("gives two uploads of the same name distinct paths", () => {
    const a = buildObjectPath("shot.png", "image/png");
    const b = buildObjectPath("shot.png", "image/png");
    expect(a).not.toBe(b);
  });

  it("falls back to a name when the filename has nothing usable", () => {
    expect(buildObjectPath("!!!.png", "image/png")).toMatch(/^projects\/image-/);
  });

  it("honours the folder it is given", () => {
    expect(buildObjectPath("x.png", "image/png", "posts").startsWith("posts/")).toBe(true);
  });
});
