import { auth } from "@/auth";
import Link from "next/link";
import { User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function Account() {
  return null;

  const session = await auth();

  if (!session) {
    return (
      <Button variant="ghost" size="icon" asChild title="Fazer login">
        <Link href="/login">
          <User className="h-4 w-4" />
          <span className="sr-only">Login</span>
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild className="gap-2">
      <Link href="/cms">
        <LayoutDashboard className="h-4 w-4" />
        <span>Painel</span>
      </Link>
    </Button>
  );
}
