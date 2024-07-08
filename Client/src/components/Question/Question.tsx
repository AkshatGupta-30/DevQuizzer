import { memo, useContext } from "react";
import { QuizzContext } from "../../context/QuizContext";
import "./Question.scss";

const Question = memo(() => {
	const { startQuiz, setStartQuiz } = useContext(QuizzContext);

	return (
		<div className='question'>
			<div className='watermark-wrapper'>
				{Array.from({ length: 12 }, (i: number) => (
					<div className='watermark' key={i}>
						DevQuizzer DevQuizzer DevQuizzer
					</div>
                ))}
			</div>
			{!startQuiz && (
				<div className='start-quiz'>
					<button className='start' onClick={() => setStartQuiz(true)}>
						Start Quiz
					</button>
				</div>
			)}
		</div>
	);
});

export default Question;
