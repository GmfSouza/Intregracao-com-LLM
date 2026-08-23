import type { LLMProvider } from "./llm.provider.js";

interface OllamaResponse {
	response?: string;
	error?: string;
}

export class OllamaProvider implements LLMProvider {
	private baseUrl: string;
	private model: string;
	constructor() {
		this.baseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
		this.model = process.env.OLLAMA_MODEL ?? "llama3";
	}

	async generate(prompt: string): Promise<string> {
		try {
			const response = await fetch(`${this.baseUrl}/api/generate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ model: this.model, prompt, stream: false }),
			});

			const data = (await response.json()) as OllamaResponse;
			if (!response.ok) {
				throw new Error(
					data.error ?? `Ollama request failed with status ${response.status}`,
				);
			}

			if (!data.response) {
				throw new Error("Ollama returned an empty response");
			}

			return data.response.trim();
		} catch (error) {
			console.error("Error in OllamaProvider.generate:", error);
			throw new Error("Error in OllamaProvider.generate");
		}
	}
}
