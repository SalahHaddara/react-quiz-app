import React from 'react';
import {CheckCircle2, XCircle} from 'lucide-react';
import {Alert} from "@/components/ui/alert";

export default function Feedback({isCorrect, points}) {
    return (
        <Alert variant={isCorrect ? "success" : "error"}>
            <div className="flex items-center gap-2">
                {isCorrect ? (
                    <>
                        <CheckCircle2 className="h-5 w-5 text-green-500"/>
                        <span className="font-medium">
              Correct! +{points} points
            </span>
                    </>
                ) : (
                    <>
                        <XCircle className="h-5 w-5 text-red-500"/>
                        <span className="font-medium">
              Incorrect. Try the next question!
            </span>
                    </>
                )}
            </div>
        </Alert>
    );
}