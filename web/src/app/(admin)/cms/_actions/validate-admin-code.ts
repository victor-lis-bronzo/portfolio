"use server";
import { cookies } from "next/headers";
import { getAdminHash } from "@/lib/auth";

export async function validateAdminCode(code: string) {
  const adminCode = process.env.ADMIN_CODE;
  const hash = getAdminHash();

  if (code === adminCode && hash) {
    (await cookies()).set("admin_session", hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }

  return { success: false, error: "Invalid code or server configuration" };
}
