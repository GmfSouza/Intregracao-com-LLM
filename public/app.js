const sourceText = document.querySelector("#source-text");
const characterCount = document.querySelector("#character-count");
const inputWordCount = document.querySelector("#input-word-count");
const summarizeButton = document.querySelector("#summarize-button");
const emptyState = document.querySelector("#empty-state");
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const summaryText = document.querySelector("#summary-text");
const resultMeta = document.querySelector("#result-meta");
const wordCount = document.querySelector("#word-count");
const copyButton = document.querySelector("#copy-button");

sourceText.addEventListener("input", () => {
	const text = sourceText.value.trim();
	const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
	characterCount.textContent = `${sourceText.value.length.toLocaleString("pt-BR")} / 15.000`;
	inputWordCount.textContent = `${words} ${words === 1 ? "palavra" : "palavras"}`;
});

summarizeButton.addEventListener("click", async () => {
	const text = sourceText.value.trim();
	if (!text) {
		sourceText.focus();
		showError("Escreva ou cole um texto antes de gerar o resumo.");
		return;
	}

	if (text.length < 1_000) {
		sourceText.focus();
		showError("O texto deve ter pelo menos 1.000 caracteres.");
		return;
	}

	setLoading(true);
	try {
		const response = await fetch("/api/llm/summarize", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text }),
		});
		const data = await response.json();
		if (!response.ok)
			throw new Error(data.error || "Não foi possível gerar o resumo.");
		showSummary(data.summary);
	} catch (error) {
		showError(
			error instanceof Error
				? error.message
				: "Não foi possível gerar o resumo.",
		);
	} finally {
		setLoading(false);
	}
});

copyButton.addEventListener("click", async () => {
	await navigator.clipboard.writeText(summaryText.textContent);
	copyButton.innerHTML = '<span aria-hidden="true">&#10003;</span> copiado';
	setTimeout(() => {
		copyButton.innerHTML = '<span aria-hidden="true">&#10697;</span> copiar';
	}, 1800);
});

function setLoading(isLoading) {
	summarizeButton.disabled = isLoading;
	summarizeButton.querySelector("span:first-child").textContent = isLoading
		? "Gerando..."
		: "Gerar resumo";
	emptyState.hidden = isLoading;
	summaryText.hidden = isLoading;
	loadingState.hidden = !isLoading;
	errorState.hidden = true;
	if (isLoading) resultMeta.hidden = true;
}

function showSummary(summary) {
	summaryText.textContent = summary;
	summaryText.hidden = false;
	emptyState.hidden = true;
	errorState.hidden = true;
	resultMeta.hidden = false;
	copyButton.disabled = false;
	wordCount.textContent = `${summary.split(/\s+/).filter(Boolean).length} palavras`;
}

function showError(message) {
	errorState.textContent = message;
	errorState.hidden = false;
	emptyState.hidden = true;
	summaryText.hidden = true;
	resultMeta.hidden = true;
}
