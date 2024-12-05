import {useEffect, useCallback, useRef} from 'react';
import {useQuizContext} from '../context/QuizContext';
import {quizData} from '../data/quizData';

export function useQuiz() {
    const {state, dispatch} = useQuizContext();
    const timeoutRef = useRef(null);
    const isMovingRef = useRef(false);

    // Effect to handle feedback timing
    useEffect(() => {
        if (state.showFeedback && !isMovingRef.current) {
            isMovingRef.current = true;

            timeoutRef.current = setTimeout(() => {
                const currentQuiz = quizData[state.currentQuizIndex];
                dispatch({
                    type: 'MOVE_TO_NEXT',
                    payload: {currentQuiz}
                });
                isMovingRef.current = false;
            }, 1500);

            return () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                isMovingRef.current = false;
            };
        }
    }, [state.showFeedback, state.currentQuizIndex, dispatch]);

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
        currentQuestion: state.currentQuizIndex !== null && !state.quizComplete ?
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