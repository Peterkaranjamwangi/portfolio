"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { storageService, type UploadFolder } from "@/services";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  validateUpload,
} from "@/lib/storage";

/**
 * Picks an image, uploads it to the Supabase bucket, and reports the public URL.
 *
 * The file is validated here before it is sent, purely to save an upload that
 * the route would reject anyway — the route runs the same check, and that is
 * the one that decides.
 */
export function ImageUpload({
  value,
  onChange,
  folder = "projects",
  label = "Image",
  className,
}: {
  /** Current public URL, or null. */
  value: string | null;
  onChange: (next: { url: string; path: string } | null) => void;
  folder?: UploadFolder;
  label?: string;
  className?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    const rejection = validateUpload({ type: file.type, size: file.size });
    if (rejection) {
      setError(rejection.reason);
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await storageService.upload(file, folder);
      onChange({ url: uploaded.url, path: uploaded.path });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      // Clearing the input lets the same file be chosen again after a failure;
      // without it the change event never fires a second time.
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="font-mono text-label-xs uppercase tracking-widest text-on-surface-variant">
        {label}
      </p>

      <div className="flex items-start gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden border-2 border-ink bg-surface-container-high">
          {value ? (
            <Image src={value} alt="" fill sizes="96px" className="object-cover" />
          ) : (
            <span className="flex size-full items-center justify-center text-on-surface-variant">
              <ImagePlus className="size-6" aria-hidden="true" />
            </span>
          )}

          {isUploading && (
            <span className="absolute inset-0 flex items-center justify-center bg-surface/70">
              <Loader2
                className="size-5 animate-spin text-beacon motion-reduce:animate-none"
                aria-hidden="true"
              />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(",")}
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="surface"
              size="sm"
              disabled={isUploading}
              onClick={() => inputRef.current?.click()}
            >
              {value ? "Replace" : "Choose image"}
            </Button>

            {value && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isUploading}
                onClick={() => {
                  // Only the reference is dropped. Deleting the object here
                  // would strand any other row still pointing at it, and an
                  // unsaved form change would have destroyed the live image.
                  onChange(null);
                  setError(null);
                }}
              >
                <Trash2 aria-hidden="true" />
                Remove
              </Button>
            )}
          </div>

          <p className="font-mono text-label-xs uppercase tracking-wider text-on-surface-variant">
            JPEG, PNG, WebP, AVIF or GIF · up to{" "}
            {Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}MB
          </p>

          {error && (
            <p role="alert" className="text-body-sm text-signal">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
