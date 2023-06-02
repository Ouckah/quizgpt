"use client"
import { useState, useRef } from "react";

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

const Generator = ({  }) => {

    const KEY = ""
    
    const topic = "Biology";

    // creates a chat to respond to the user's request
    const chat = new ChatOpenAI({
        openAIApiKey: KEY,
        maxTokens: 1000,
        streaming: true,
        maxConcurrency: 5,
    });

    const generateHandler = async () => {

        // clear current question
        setQuestion("");
        setFinished(false);
        setAnswer("");

        // makes an API call to OpenAI with the following context
        await chat.call([
                    
            // context that the AI is a job recruiter fixing resumes
            new SystemChatMessage(
                `You are a trivia / quizbowl question generator that provides questions and answers based on certain topics.
                You provide only unique questions that you have not asked before.
                You will only ask the question with no other text surrounding the question.
                Do not include questions whos answers are any of the following: ${answers}`
            ),
            
            // context of a human asking to have their resume rewritten
            new HumanChatMessage(
                `Give me a question on ${topic} and only state the question. Do not include any questions that have the answer of any of these: ${answers}`
            ),
        ],
        undefined,
        [
            {
                // as tokens are fed, append to end of response and display
                handleLLMNewToken(token) {
                    setQuestion((prevText) => prevText + token);
                },
            },
        ]);

        // flag question as finished
        setFinished(true);

        setQuestions((prevQuestions) => [...prevQuestions, question]);

    }

    const answerHandler = async () => {

        if (!flipped) {
            generateHandler();
            setFlipped(!flipped);
            return;
        }

        setFlipped(!flipped)

        // clear current question and answer
        setQuestion("");
        setAnswer("");

        let localAnswer = "";

        // makes an API call to OpenAI with the following context
        await chat.call([
            
            // context of a human asking to have their resume rewritten
            new HumanChatMessage(
                `What is the answer to ${question}. Only generate the answer and no other text.`
            ),
        ],
        undefined,
        [
            {
                // as tokens are fed, append to end of response and display
                handleLLMNewToken(token) {
                    setAnswer((prevText) => prevText + token);
                    localAnswer += token;
                },
            },
        ])

        // add answer to answer list
        setAnswers((prevAnswers) => [...prevAnswers, localAnswer]);

        console.log(answers)

    }
    
    const [question, setQuestion] = useState("");
    const [finished, setFinished] = useState(false);
    const [answer, setAnswer] = useState("");

    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);

    const [flipped, setFlipped] = useState(false);

    return (
        <>
        
            <button 
                className={`flex w-full h-full flex-col justify-center items-center rounded-xl bg-gray-900 shadow-blue border-white border-2`}
                onClick={answerHandler}
            >
                <p className="text-white font-bold text-2xl p-5">{question.length > 0 ? (question) : (answer)}</p>
            </button>
        
        </>
    )
}

export default Generator;