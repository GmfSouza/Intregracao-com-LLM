import { z } from 'zod';

export const summarizeSchema = z.object({
  text: z.string().trim().min(1, 'Text is required').max(20_000, 'Text must be at most 20,000 characters'),
});

export type SummarizeInput = z.infer<typeof summarizeSchema>;
