interface IFirebaseService {
  savePromptAndReponse({
    prompt,
    response,
  }: {
    prompt: string;
    response: any;
  }): Promise<void>;
}
