"use client"
import { useState, ChangeEvent, useRef } from "react";

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

const Generator = ({  }) => {

    const KEY = ""
    
    // creates a chat to respond to the user's request
    const chat = new ChatOpenAI({
        openAIApiKey: KEY,
        maxTokens: 1000,
        streaming: true,
        maxConcurrency: 5,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
        ),
        new MessagesPlaceholder("trivia"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const generateHandler = async () => {

        // // clear current text
        // setQuestion("");

        chain.current = new ConversationChain({
            memory: new BufferMemory({ returnMessages: true, memoryKey: "trivia" }),
            prompt: chatPrompt,
            llm: chat,
        });
        
        // makes an API call to OpenAI with the following context
        await chain.current.call({ input: "Give me a question about video games." },
            [
                {
                    // as tokens are fed, append to end of response and display
                    handleLLMNewToken(token: string) {
                        setQuestion((prevText: string) => prevText + token);
                    },
                },
            ]
        );
    }

    const submitHandler = async () => {

        // makes an API call to OpenAI with the following context
        await chain.current.call({ input: `I believe the answer is ${answer}` },
            [
                {
                    // as tokens are fed, append to end of response and display
                    handleLLMNewToken(token: string) {
                        setResponse((prevText: string) => prevText + token);
                    },
                },
            ]
        );
    }
    
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [response, setResponse] = useState("");
    const chain = useRef(new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "trivia" }),
        prompt: chatPrompt,
        llm: chat,
    }));

    return (
        <>
        
            <div className="flex w-full h-full flex-col rounded-xl bg-gray-900 shadow-blue border-white border-2">
                <p>{question.length > 0 && question}</p>
                <button onClick={generateHandler}>Generate</button>

                {question.length > 0 ? (
                    <>
                        <input onChange={(e) => setAnswer(e.target.value)} className="text-black"></input>
                        <button onClick={submitHandler}>Submit</button>
                        <p>{answer.length > 0 && answer}</p>
                        <p>{response.length > 0 && response}</p>
                    </>
                ) : (<></>)}
            </div>
        
        </>
    )
}

export default Generator;