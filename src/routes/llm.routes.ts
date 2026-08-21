import { Router } from "express";
import type { LLMController } from "../controllers/llm.controller.js";

export function createLLMRoutes(controller: LLMController): Router {
	const router = Router();
	router.post("/summarize", controller.summarize);
	return router;
}
