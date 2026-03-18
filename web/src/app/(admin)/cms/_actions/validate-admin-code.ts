"use server";
import { cookies } from "next/headers";

export async function validateAdminCode(code: string) {
  const adminCode = process.env.ADMIN_CODE;

  if (code === adminCode) {
    (await cookies()).set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }

  return { success: false, error: "Invalid code" };
}
