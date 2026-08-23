import { GoogleGenAI } from "@google/genai";
import type { LLMProvider } from "./llm.provider.js";

export class GoogleAiProvider implements LLMProvider {
	private readonly client: GoogleGenAI;

	constructor(
		apiKey: string,
		private readonly model: string,
	) {
		this.client = new GoogleGenAI({ apiKey });
	}

	async generate(prompt: string): Promise<string> {
		const response = await this.client.models.generateContent({
			model: this.model,
			contents: prompt,
		});

		const content = response.text?.trim();
		if (!content) {
			throw new Error("Google AI returned an empty response");
		}

		return content;
	}
}
