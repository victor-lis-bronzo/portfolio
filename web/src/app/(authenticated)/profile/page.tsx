import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { usersService } from "@portfolio/core";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { updateProfilePreferences, logOutAction } from "./actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ProfileForm } from "./components/profile-form";

export default async function ProfilePage() {
  const session = await auth();
  const user = await usersService.findById(session?.user?.id!);

  return (
    <div className="container max-w-2xl py-10 mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e preferências de conta.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Informações associadas à sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome</p>
              <p className="text-base">{user?.name!}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-base">{user?.email!}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
          <CardDescription>
            Gerencie as notificações e atualizações que você recebe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            userId={user?.id!}
            initialReceivesUpdates={user?.receivesUpdates!}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end pt-6">
        <form action={logOutAction}>
          <Button variant="destructive" className="gap-2" type="submit">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </form>
      </div>
    </div>
  );
}
