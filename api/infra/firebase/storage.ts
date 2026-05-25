import admin from "firebase-admin";

export class FirebaseStorage {
  private bucket() {
    try {
      return admin.storage().bucket();
    } catch {
      return null;
    }
  }

  async upload(
    buffer: Buffer,
    path: string,
    contentType: string,
  ): Promise<string> {
    const bucket = this.bucket();
    if (!bucket) {
      console.warn(`⚠️ Firebase is not initialized. Mocking upload of ${path}`);
      return `https://mock-storage.firebase/avatars/mock-user-id`;
    }
    const file = bucket.file(path);
    await file.save(buffer, { contentType, public: true });
    return file.publicUrl();
  }

  async delete(path: string): Promise<void> {
    const bucket = this.bucket();
    if (!bucket) {
      console.warn(`⚠️ Firebase is not initialized. Mocking delete of ${path}`);
      return;
    }
    const file = bucket.file(path);
    const [exists] = await file.exists();
    if (exists) await file.delete();
  }
}
