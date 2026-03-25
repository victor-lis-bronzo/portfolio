import { auth } from "@/auth";

export async function checkIsAuthenticated() {
  const session = await auth();
  return { isAuthenticated: !!session };
}
