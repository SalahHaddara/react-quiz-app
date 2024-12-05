import React from 'react';
import {QuizProvider} from './context/QuizContext';
import QuizSelection from './components/quiz/QuizSelection.jsx';
import QuizQuestion from './components/quiz/QuizQuestions.jsx';
import QuizComplete from './components/quiz/QuizComplete';
import {useQuiz} from './hooks/useQuiz';

function QuizApp() {
    const {currentQuiz, isComplete} = useQuiz();

    if (!currentQuiz) {
        return <QuizSelection/>;
    }

    if (isComplete) {
        return <QuizComplete/>;
    }

    return <QuizQuestion/>;
}

export default function App() {
    return (
        <QuizProvider>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Quiz App
                </h1>
                <QuizApp/>
            </div>
        </QuizProvider>
    );
}