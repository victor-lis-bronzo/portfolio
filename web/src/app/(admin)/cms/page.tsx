import { cookies } from "next/headers";
import { AuthForm } from "./components/auth-form";

export default async function CMS() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session");

  if (isAuthenticated?.value === "true") {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Hello World! Painel Seguro.</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <AuthForm />
    </div>
  );
}