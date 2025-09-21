import React, { useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  disaster: string;
  questions: Question[];
  onComplete: (score: number) => void;
  onRetry: () => void;
}

const Quiz: React.FC<QuizProps> = ({ disaster, questions, onComplete, onRetry }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleCompleteQuiz = () => {
    const finalScore = Math.round((score / questions.length) * 100);
    onComplete(finalScore);
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
    onRetry();
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! You\'re well prepared for this disaster!';
    if (percentage >= 60) return 'Good job! Review the material to improve further.';
    return 'Keep studying! You\'ll get better with practice.';
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${percentage >= 60 ? 'bg-green-100' : 'bg-red-100'}`}>
              <Award className={`h-12 w-12 ${percentage >= 60 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(percentage)}`}>
            {score}/{questions.length}
          </div>
          <div className={`text-lg font-semibold mb-4 ${getScoreColor(percentage)}`}>
            {percentage}%
          </div>
          <p className="text-gray-600 mb-6">{getScoreMessage(percentage)}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {percentage >= 60 ? (
            <button
              onClick={handleCompleteQuiz}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              Complete Module
            </button>
          ) : (
            <button
              onClick={handleRetryQuiz}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Knowledge Check</h2>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === null
                  ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  : selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-red-500 bg-red-50 text-red-800'
                  : index === question.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {selectedAnswer !== null && (
                  <div>
                    {index === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className="font-semibold mb-2 text-gray-900">Explanation:</h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;