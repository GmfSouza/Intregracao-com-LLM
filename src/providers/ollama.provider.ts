import type { LLMProvider } from './llm.provider.js';

interface OllamaResponse {
  response?: string;
  error?: string;
}

export class OllamaProvider implements LLMProvider {
  constructor(
    private readonly baseUrl: string,
    private readonly model: string,
  ) {}

  async generate(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: this.model, prompt, stream: false }),
    });

    const data = (await response.json()) as OllamaResponse;
    if (!response.ok) {
      throw new Error(data.error ?? `Ollama request failed with status ${response.status}`);
    }

    if (!data.response) {
      throw new Error('Ollama returned an empty response');
    }

    return data.response.trim();
  }
}
