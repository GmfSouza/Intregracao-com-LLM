import express from "express";
import { LLMController } from "./controllers/llm.controller.js";
import { OllamaProvider } from "./providers/ollama.provider.js";
import { OpenAIProvider } from "./providers/openai.provider.js";
import { createLLMRoutes } from "./routes/llm.routes.js";
import { LLMService } from "./services/llm.service.js";

function createProvider() {
	const provider = process.env.LLM_PROVIDER ?? "ollama";

	if (provider === "openai") {
		if (!process.env.OPENAI_API_KEY) {
			throw new Error("OPENAI_API_KEY is required when LLM_PROVIDER=openai");
		}
		return new OpenAIProvider(
			process.env.OPENAI_API_KEY,
			process.env.OPENAI_MODEL ?? "gpt-4o-mini",
		);
	}

	if (provider === "ollama") {
		return new OllamaProvider(
			process.env.OLLAMA_URL ?? "http://localhost:11434",
			process.env.OLLAMA_MODEL ?? "llama3.2",
		);
	}

	throw new Error(`Unsupported LLM_PROVIDER: ${provider}`);
}

const app = express();
const service = new LLMService(createProvider());
const controller = new LLMController(service);

app.use(express.json());
app.get("/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/llm", createLLMRoutes(controller));

export { app };
