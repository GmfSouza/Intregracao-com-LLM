import type { LLMProvider } from "../providers/llm.provider.js";

export class LLMService {
	private readonly provider: LLMProvider;
	constructor(provider: LLMProvider) {
		this.provider = provider;
	}

	async generateSummary(text: string): Promise<string> {
		const prompt = [
			"Resuma o texto abaixo em português do Brasil.",
			"Atue como assistente especialista em síntese de informações, mantendo o contexto e a essência do conteúdo.",
			"Seja claro e objetivo, preservando as informações principais. Retorne Apenas o resumo, sem explicações adicionais.",
			"",
			`Texto:\n${text}`,
		].join("\n");

		return await this.provider.generate(prompt);
	}
}
