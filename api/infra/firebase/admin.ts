import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";

export function initFirebase(
  serviceAccountPath: string,
  storageBucket: string,
) {
  if (admin.apps.length > 0) return admin;

  // 1. Checa se o emulador está configurado no .env
  const isEmulator = !!process.env.FIREBASE_STORAGE_EMULATOR_HOST;

  if (isEmulator) {
    console.log("🔌 Conectando ao emulador do Firebase Storage...");
    admin.initializeApp({
      projectId: "portfolio-project",
      storageBucket,
    });
    return admin;
  }

  // 2. Fluxo normal (Produção)
  if (!existsSync(serviceAccountPath)) {
    console.warn(
      `⚠️ Warning: Firebase Service Account file not found at: ${serviceAccountPath}. Firebase Storage operations will be mocked.`,
    );
    return null;
  }

  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket,
  });

  return admin;
}
