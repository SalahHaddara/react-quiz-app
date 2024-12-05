export function useQuiz() {
    const checkAnswer = (userAnswer, correctAnswer, type) => {
        if (type === 'text-input') {
            return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
        }
        return userAnswer === correctAnswer;
    };


}