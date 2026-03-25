"use server";

import { usersService } from "@portfolio/core";
import { revalidatePath } from "next/cache";
import { signOut } from "@/auth";

export async function updateProfilePreferences(
  userId: string,
  receivesUpdates: boolean,
) {
  try {
    await usersService.update(userId, { receivesUpdates });
    revalidatePath("/profile");
    return { success: true };
  } catch (error) {
    console.error("Failed to update preferences:", error);
    return { success: false, error: "Falha ao atualizar preferências" };
  }
}

export async function logOutAction() {
  await signOut({ redirectTo: "/cms" });
}
