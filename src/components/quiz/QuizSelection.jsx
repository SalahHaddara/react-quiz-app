import React from 'react';
import {Card, CardHeader, CardTitle, CardDescription, CardFooter} from "../ui/card";
import {Button} from "../ui/button";
import {useQuiz} from '../../hooks/useQuiz';
import {quizData} from '../../data/quizData';

export default function QuizSelection() {
    const {startQuiz} = useQuiz();

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
            <div className="grid gap-4">
                {quizData.map((quiz, index) => (
                    <Card key={quiz.id} className="hover:bg-gray-50 transition-colors">
                        <CardHeader>
                            <CardTitle>{quiz.title}</CardTitle>
                            <CardDescription>{quiz.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button
                                onClick={() => startQuiz(index)}
                                className="w-full"
                            >
                                Start Quiz
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}