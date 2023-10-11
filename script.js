import { config } from 'dotenv';
config();

import OpenAI from 'openai';
import readline from "readline"

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.setPrompt('You: ');

const promptUser = () => {
    userInterface.prompt();
};

userInterface.on("line", async (input) => {
    if (input.trim() === "") {
        promptUser();
        return;
    }

    const userMessage = {
        role: "user",
        content: input
    };

    const chatConversation = {
        messages: [userMessage]
    };

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [chatConversation],
        });

        const responseMessage = chatCompletion.choices[0].message.content;
        console.log(`AI: ${responseMessage}`);
    } catch (error) {
        console.error("Error:", error);
    }

    promptUser();
});

userInterface.on("close", () => {
    console.log("CLI closed.");
    process.exit(0);
});

promptUser();
