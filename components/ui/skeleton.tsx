import { cn } from "@/lib/utils";

/**
 * A loading placeholder.
 *
 * `aria-hidden` because a skeleton is a picture of content that does not exist
 * yet — the surrounding region announces the loading state instead.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse bg-surface-container-high", className)}
      {...props}
    />
  );
}
