import React, {createContext, useContext, useReducer} from 'react';

const QuizContext = createContext();

const initialState = {
    currentQuizIndex: null,
    currentQuestionIndex: 0,
    userAnswer: "",
    score: 0,
    quizComplete: false,
    showFeedback: false,
    isCorrect: false
};

function quizReducer(state, action) {
    switch (action.type) {
        case 'START_QUIZ':
            return {
                ...initialState,
                currentQuizIndex: action.payload
            };

        case 'SET_ANSWER':
            return {
                ...state,
                userAnswer: action.payload
            };

        case 'SUBMIT_ANSWER':
            return {
                ...state,
                score: state.score + action.payload.points,
                showFeedback: true,
                isCorrect: action.payload.isCorrect
            };

        case 'MOVE_TO_NEXT': {
            const currentQuiz = action.payload.currentQuiz;
            const nextIndex = state.currentQuestionIndex + 1;

            if (nextIndex >= currentQuiz.questions.length) {
                return {
                    ...state,
                    showFeedback: false,
                    quizComplete: true
                };
            }

            return {
                ...state,
                currentQuestionIndex: nextIndex,
                userAnswer: "",
                showFeedback: false
            };
        }

        default:
            return state;
    }
}

export function QuizProvider({children}) {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    return (
        <QuizContext.Provider value={{state, dispatch}}>
            {children}
        </QuizContext.Provider>
    );
}

export const useQuizContext = () => useContext(QuizContext);