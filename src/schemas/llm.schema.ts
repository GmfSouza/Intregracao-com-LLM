import { z } from "zod";

export const summarizeSchema = z.object({
	text: z
		.string({
			invalid_type_error: "Text must be a string",
			required_error: "Text is required"
		})
		.trim()
		.min(10, "Text must be at least 10 characters")
		.max(15_000, "Text must be at most 15,000 characters"),
});

export type SummarizeInput = z.infer<typeof summarizeSchema>;
