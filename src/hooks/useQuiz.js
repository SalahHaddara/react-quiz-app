import {useEffect} from 'react';
import {useQuizContext} from '../context/QuizContext';
import {quizData} from '../data/quizData';

export function useQuiz() {
    const {state, dispatch} = useQuizContext();

    const checkAnswer = (userAnswer, correctAnswer, type) => {
        if (type === 'text-input') {
            return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        }
        return userAnswer === correctAnswer;
    };

    const startQuiz = (index) => {
        dispatch({type: 'START_QUIZ', payload: index});
    };

    const submitAnswer = () => {
        const currentQuiz = quizData[state.currentQuizIndex];
        const currentQuestion = currentQuiz.questions[state.currentQuestionIndex];

        const isCorrect = checkAnswer(
            state.userAnswer,
            currentQuestion.correctAnswer,
            currentQuestion.type
        );

        dispatch({
            type: 'UPDATE_SCORE',
            payload: isCorrect ? currentQuestion.points : 0
        });

        useEffect(() => {
            if (state.showFeedback) {
                const timer = setTimeout(() => {
                    if (state.currentQuestionIndex < currentQuiz.questions.length - 1) {
                        dispatch({type: 'NEXT_QUESTION'});
                    } else {
                        dispatch({type: 'COMPLETE_QUIZ'});
                    }
                }, 1500); // Show feedback for 1.5 seconds

                return () => clearTimeout(timer);
            }
        }, [state.showFeedback]);
    };

}