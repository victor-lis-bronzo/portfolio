import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export function getAdminHash() {
  const adminCode = process.env.ADMIN_CODE;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!adminCode || !sessionSecret) {
    return null;
  }

  return createHash("sha256")
    .update(`${adminCode}${sessionSecret}`)
    .digest("hex");
}

export async function checkIsAuthenticated() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session");
  const expectedHash = getAdminHash();

  if (!sessionCookie || !expectedHash) {
    return { isAuthenticated: false };
  }

  return { isAuthenticated: sessionCookie.value === expectedHash };
}
