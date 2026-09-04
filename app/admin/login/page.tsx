import { redirect } from "next/navigation";

/**
 * `/admin/login` predates Supabase Auth and was never implemented. It stays as
 * a redirect so any bookmark or old link lands on the real sign-in screen
 * rather than a blank page.
 */
export default function AdminLoginPage() {
  redirect("/sign-in?redirectTo=/admin/dashboard");
}
