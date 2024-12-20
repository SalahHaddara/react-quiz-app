import React from 'react';
import {Card, CardHeader, CardContent, CardFooter, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {useQuiz} from '../../hooks/useQuiz';
import Feedback from './../ui/Feedback.jsx';

export default function QuizQuestion() {
    const {
        currentQuestion,
        userAnswer,
        handleAnswer,
        submitAnswer,
        questionNumber,
        totalQuestions,
        score,
        showFeedback,
        isCorrect
    } = useQuiz();

    if (!currentQuestion) return null;

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Question {questionNumber} of {totalQuestions}</span>
                    <span className="text-sm">Score: {score}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-lg font-medium">
                    {currentQuestion.question}
                </div>

                {showFeedback && (
                    <Feedback
                        isCorrect={isCorrect}
                        points={currentQuestion.points}
                    />
                )}

                {currentQuestion.type === 'multiple-choice' ? (
                    <div className="grid gap-2">
                        {currentQuestion.options.map((option) => (
                            <Button
                                key={option}
                                variant={userAnswer === option ? "default" : "outline"}
                                className="justify-start"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => handleAnswer(e.target.value)}
                        placeholder="Type your answer..."
                        className="w-full"
                    />
                )}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={submitAnswer}
                    disabled={!userAnswer || showFeedback}
                    className="w-full"
                >
                    Submit Answer
                </Button>
            </CardFooter>
        </Card>
    );
}