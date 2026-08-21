# LLM Integration API

API REST em Node.js e TypeScript para gerar resumos usando OpenAI ou Ollama.

## Requisitos

- Node.js 20+
- npm
- Ollama local, caso use o provider `ollama`

## Instalação

```bash
npm install
Copy-Item .env.example .env
```

No Linux/macOS, use `cp .env.example .env` no lugar de `Copy-Item`.

## Configuração

O provider padrão é Ollama:

```env
LLM_PROVIDER=ollama
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
PORT=3000
```

Para OpenAI:

```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sua-chave
OPENAI_MODEL=gpt-4o-mini
PORT=3000
```

## Execução

```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

## Endpoint

`POST /api/llm/summarize`

```json
{
	"text": "Texto que será resumido pela LLM..."
}
```

Resposta:

```json
{
	"summary": "Resumo gerado pela LLM..."
}
```

O endpoint `GET /health` confirma se a aplicação está disponível.

## Build de produção

```bash
npm run build
npm start
```
