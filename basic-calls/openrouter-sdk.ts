import { OpenRouter } from "@openrouter/sdk"
import "dotenv/config"

const client = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY
});

const response = await client.responses.send({
    responsesRequest: {
        model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
        input: 'Explain quantum computing in one sentence.',
    }
});

if (!('output' in response)) {
  throw new Error('Expected a non-streaming response');
}
if (response.status !== 'completed') {
  throw new Error(response.error?.message ?? `Response ended as ${response.status}`);
}

const message = [...response.output].reverse().find((item) => item.type === 'message');
console.log(message?.content.find((part) => part.type === 'output_text')?.text);