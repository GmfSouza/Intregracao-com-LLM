import OpenAI from 'openai';
import type { LLMProvider } from './llm.provider.js';

export class OpenAIProvider implements LLMProvider {
  private readonly client: OpenAI;

  constructor(
    apiKey: string,
    private readonly model: string,
  ) {
    this.client = new OpenAI({ apiKey });
  }

  async generate(prompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = completion.choices[0]?.message.content?.trim();
    if (!content) {
      throw new Error('OpenAI returned an empty response');
    }

    return content;
  }
}
