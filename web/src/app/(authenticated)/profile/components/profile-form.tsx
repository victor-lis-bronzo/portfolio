"use client";

import { useTransition } from "react";
import { updateProfilePreferences } from "../actions";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProfileFormProps {
  userId: string;
  initialReceivesUpdates: boolean;
}

export function ProfileForm({ userId, initialReceivesUpdates }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    
    startTransition(async () => {
      const result = await updateProfilePreferences(userId, isChecked);
      if (result.success) {
        toast.success("Preferências atualizadas com sucesso!");
      } else {
        toast.error(result.error || "Ocorreu um erro ao atualizar.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="receives-updates"
          defaultChecked={initialReceivesUpdates}
          onChange={handleToggle}
          disabled={isPending}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "accent-primary"
          )}
        />
        <Label 
          htmlFor="receives-updates" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Aceito receber novidades e atualizações sobre novos conteúdos e projetos.
        </Label>
      </div>
      {isPending && <p className="text-sm text-muted-foreground">Salvando...</p>}
    </div>
  );
}
