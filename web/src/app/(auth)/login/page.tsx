import { AuthForm } from "@/app/(admin)/cms/components/auth-form";

export default async function LoginPage() {
  return (
    <div className="flex bg-transparent h-screen items-center justify-center p-4">
      <AuthForm />
    </div>
  );
}
