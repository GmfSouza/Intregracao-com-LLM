import type { LLMProvider } from "../providers/llm.provider.js";

export class LLMService {
	constructor(private readonly provider: LLMProvider) {}

	summarize(text: string): Promise<string> {
		const prompt = [
			"Resuma o texto abaixo em português do Brasil.",
			"Seja claro e objetivo, preservando as informações principais.",
			"",
			`Texto:\n${text}`,
		].join("\n");

		return this.provider.generate(prompt);
	}
}
