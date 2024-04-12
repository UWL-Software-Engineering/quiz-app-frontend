import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_API_BASE_URL + '/get_quizz';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(api);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    console.log("9999999999")
    // Check if the user has selected an option
    if (!selectedOption) {
      return;
    }
  
    // Check if the selected option is correct
    const currentAnswer = questions[currentQuestion].correct_answer;
    if (selectedOption === currentAnswer) {
      setScore(score + 1);
    }
  
    // Proceed to the next question or finish the quiz
    setSelectedOption('');
    if (currentQuestion === questions.length - 1) {
      // If it's the last question, finish the quiz
      console.log('Quiz completed. Score:', score + 1); // Log the final score
      setShowResults(true);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (showResults) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md bg-teal-600 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-white">Quiz Results</h1>
            <p className="text-2xl mt-4 text-white">Your score: {score}/{questions.length}</p>
          </div>
        </div>
      </div>
    );
  }
  
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Quiz App</h1>
      <h2 className="text-2xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`p-4 bg-blue-500 text-white rounded-md ${selectedOption === option ? 'bg-blue-600' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {currentQuestion === questions.length - 1 && (
        <button
          className="mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {currentQuestion < questions.length - 1 && (
        <button
          className="mt-8 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Quiz;
