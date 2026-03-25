import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: string;
      provider?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    provider?: string;
  }
}
