import React from 'react';

import CardOption from "@/components/CardOption";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col items-center gap-3 p-10">
        <h1 className="text-6xl font-semibold">QuizGPT</h1>
        <p className="text-lg tracking-widest opacity-75">An AI approach to Trivia</p>
      </div>

      <div className="flex flex-col justify-evenly items-center gap-3">
        <h1 className="text-2xl font-semibold">Pick A Card</h1>
        <p className="text-lg opacity-75 text-center">Whether users prefer generating unique trivia questions, exploring diverse question sets, or contributing their own creations, QuizGPT offers a comprehensive and immersive experience for trivia lovers of all kinds.</p>
        <div className="flex h-72 flex-row items-center gap-8 p-3">
          <CardOption
            title="Generate"
            description="Use AI to generate diverse and challenging trivia questions for practice and fun!"
            image=""
          />
          <CardOption
            title="Explore"
            description="Discover question sets by fellow trivia enthusiasts and explore a wide range of topics!"
            image=""
          />
          <CardOption
            title="Publish"
            description="Create and share your own question sets on QuizGPT, inspiring others with your trivia creations!"
            image=""
          />
        </div>
      </div>

    </main>
  )
}
