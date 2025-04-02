import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const characters = [
  { name: "Maximilien Robespierre", image: "robespierre.jpg" },
  { name: "Louis XVI", image: "louisxvi.jpg" },
  { name: "Marie Antoinette", image: "marie.jpg" },
  { name: "Jean-Paul Marat", image: "marat.jpg" },
  { name: "Georges Danton", image: "danton.jpg" }
];

const questions = [
  { type: "mc", question: "What year did the French Revolution start?", options: ["1787", "1789", "1791", "1793"], answer: "1789" },
  { type: "short", question: "What was the purpose of the Tennis Court Oath?", answer: "To establish a new constitution." },
  { type: "choice", question: "Do you think the execution of Louis XVI was justified? Explain in at least five sentences.", answer: "" }
  // Add more questions here (total 31 mixed questions)
];

const FrenchRevolutionGame = () => {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [position, setPosition] = useState([0, 0, 0, 0, 0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const nextTurn = () => {
    setCurrentPlayer((prev) => (prev + 1) % characters.length);
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
    setPosition((prev) => {
      const newPos = [...prev];
      newPos[currentPlayer] += Math.floor(Math.random() * 6) + 1;
      return newPos;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">French Revolution Board Game</h1>
      <div className="flex gap-4">
        {characters.map((char, index) => (
          <Card key={index} className="p-4 text-center">
            <img src={char.image} alt={char.name} className="w-24 h-24 mx-auto" />
            <p className="font-bold">{char.name}</p>
            <p>Position: {position[index]}</p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Card className="p-4">
          <p className="text-lg font-semibold">{questions[currentQuestion].question}</p>
          {questions[currentQuestion].type === "mc" && (
            <div className="mt-2">
              {questions[currentQuestion].options?.map((opt, i) => (
                <Button key={i} className="m-1">{opt}</Button>
              ))}
            </div>
          )}
          {questions[currentQuestion].type === "short" && (
            <textarea className="w-full mt-2 p-2 border" placeholder="Type your answer..." />
          )}
          {questions[currentQuestion].type === "choice" && (
            <textarea className="w-full mt-2 p-2 border" placeholder="Write your response..." />
          )}
          <Button onClick={nextTurn} className="mt-4">Next Turn</Button>
        </Card>
      </div>
    </div>
  );
};

export default FrenchRevolutionGame;