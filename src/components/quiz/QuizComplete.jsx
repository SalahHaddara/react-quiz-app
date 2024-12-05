import React from 'react';
import {Card, CardHeader, CardContent, CardFooter, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trophy} from 'lucide-react';
import {useQuiz} from '../../hooks/useQuiz';

export default function QuizComplete() {
    const {score, currentQuiz, startQuiz} = useQuiz();

    const totalPoints = currentQuiz.questions.reduce(
        (sum, question) => sum + question.points,
        0
    );

    const percentage = Math.round((score / totalPoints) * 100);

    return (
        <Card className="w-full max-w-2xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <Trophy className="h-6 w-6 text-yellow-500"/>
                    Quiz Complete!
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-4xl font-bold">{score} points</div>
                <div className="text-xl">
                    You scored {percentage}%
                </div>
                <div className="text-gray-500">
                    Total possible points: {totalPoints}
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button
                    onClick={() => startQuiz(null)}
                    className="w-full max-w-xs"
                >
                    Try Another Quiz
                </Button>
            </CardFooter>
        </Card>
    );
}