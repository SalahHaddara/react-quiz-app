import React, {createContext, useContext, useReducer} from 'react';

const QuizContext = createContext();

const initialState = {
    currentQuizIndex: null,
    currentQuestionIndex: 0,
    userAnswer: "",
    score: 0,
    quizComplete: false
};
