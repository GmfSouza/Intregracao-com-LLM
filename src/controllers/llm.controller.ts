import type { Request, Response } from "express";
import { summarizeSchema } from "../schemas/llm.schema.js";
import type { LLMService } from "../services/llm.service.js";

export class LLMController {
	constructor(private readonly service: LLMService) {}

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
			const summary = await this.service.summarize(result.data.text);
			response.json({ summary });
		} catch (error) {
			console.error(error);
			response.status(502).json({ error: "LLM provider request failed" });
		}
	};
}
