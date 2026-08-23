import type { Request, Response } from "express";
import { summarizeSchema } from "../schemas/llm.schema.js";
import type { LLMService } from "../services/llm.service.js";

export class LLMController {
	private llmService: LLMService;
	constructor(service: LLMService) {
		this.llmService = service;
	}

	summarize = async (request: Request, response: Response): Promise<void> => {
		const result = summarizeSchema.safeParse(request.body);
		if (!result.success) {
			response
				.status(400)
				.json({
					error: result.error.issues[0]?.message ?? "Invalid request body",
				});
			return;
		}

		try {
			const summary = await this.llmService.generateSummary(result.data.text);
			response.status(200).json({ summary });
		} catch (error) {
			if (error instanceof Error && error.name === "ZodError") {
				response.status(400).json({ error: error.message });
				return;
			}
			console.error("Erro no summarize",error);
			response.status(500).json({ error: "Erro interno do servidor" });
		}
	};
}
