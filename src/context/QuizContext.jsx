import React, {createContext, useContext, useReducer} from 'react';

const QuizContext = createContext();

const initialState = {
    currentQuizIndex: null,
    currentQuestionIndex: 0,
    userAnswer: "",
    score: 0,
    quizComplete: false
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
        case 'NEXT_QUESTION':
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                userAnswer: ""
            };
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