import { redirect } from "next/navigation";

/**
 * `/admin` was a lorem-ipsum placeholder. The working admin lives at
 * `/admin/dashboard`, so this sends visitors (and old bookmarks) there
 * instead of rendering filler.
 */
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
