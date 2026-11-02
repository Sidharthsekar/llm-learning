import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
    baseURL: "",
    apiKey: ""
});

const message = await client.messages.create({
    max_tokens:1024,
    messages:[{role: "User", content: "Explain about harness in AI context"}],
    model: "claude-opus-5-5"
});

for (const block of message.content){
    if(block.type === "text"){
        console.log(block.text);
    }
}