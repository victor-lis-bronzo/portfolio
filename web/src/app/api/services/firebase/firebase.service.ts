import { addDoc, collection, Firestore } from "firebase/firestore";

export class FirebaseService implements IFirebaseService {
  private db: Firestore;

  constructor(database: Firestore) {
    this.db = database;
  }

  async savePromptAndReponse({
    prompt,
    response,
  }: {
    prompt: string;
    response: string;
  }) {
    let parsedResponse = response;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      parsedResponse = response;
    }

    await addDoc(collection(this.db, "query"), {
      prompt,
      response: parsedResponse,
      createdAt: new Date(),
      environment: process.env.NODE_ENV,
    });
  }
}
