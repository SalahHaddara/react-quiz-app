import {useQuizContext} from '../context/QuizContext';

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
}