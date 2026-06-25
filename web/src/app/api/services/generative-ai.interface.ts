interface IGenerativeAIService {
  generateNode({ prompt }: { prompt: string }): Promise<{ response: string }>;
}
