import {useEffect} from 'react';
import {useQuizContext} from '../context/QuizContext';
import {quizData} from '../data/quizData';

export function useQuiz() {
    const {state, dispatch} = useQuizContext();

    useEffect(() => {
        if (state.showFeedback) {
            const timer = setTimeout(() => {
                const currentQuiz = quizData[state.currentQuizIndex];
                if (state.currentQuestionIndex < currentQuiz.questions.length - 1) {
                    dispatch({type: 'NEXT_QUESTION'});
                } else {
                    dispatch({type: 'COMPLETE_QUIZ'});
                }
            }, 1500); // Show feedback for 1.5 seconds

            return () => clearTimeout(timer);
        }
    }, [state.showFeedback, state.currentQuestionIndex, state.currentQuizIndex, dispatch]);

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
            type: 'SUBMIT_ANSWER',
            payload: {
                isCorrect,
                points: isCorrect ? currentQuestion.points : 0
            }
        });
    };

    const handleAnswer = (answer) => {
        dispatch({type: 'SET_ANSWER', payload: answer});
    };

    return {
        currentQuiz: state.currentQuizIndex !== null ? quizData[state.currentQuizIndex] : null,
        currentQuestion: state.currentQuizIndex !== null ?
            quizData[state.currentQuizIndex].questions[state.currentQuestionIndex] : null,
        userAnswer: state.userAnswer,
        score: state.score,
        isComplete: state.quizComplete,
        questionNumber: state.currentQuestionIndex + 1,
        totalQuestions: state.currentQuizIndex !== null ?
            quizData[state.currentQuizIndex].questions.length : 0,
        showFeedback: state.showFeedback,
        isCorrect: state.isCorrect,

        startQuiz,
        handleAnswer,
        submitAnswer
    };
}