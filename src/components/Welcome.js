import React from 'react';
import { Link } from 'react-router-dom';
import quizImage from "../assets/quizimage2.png";

export default function Welcome({ type = 'Button', action = 'start' }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <img src={quizImage} alt="Quiz" />
      <h5 className="text-4xl font-bold mt-10">Test your knowledge with our technical questions!</h5>
      <Link to="/quiz-page" className="mt-10 p-2 text-center text-white bg-teal-500 rounded-lg font-bold text-2xl">
        Start Quiz
      </Link>
    </div>
  );
}
