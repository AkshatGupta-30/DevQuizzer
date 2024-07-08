import { memo, useContext } from "react";
import { QuizzContext } from "../../context/QuizContext";
import "./Question.scss";
import Timer from "../Timer/Time";

const Question = memo(() => {
	const { category, startQuiz, setStartQuiz } = useContext(QuizzContext);

	return (
		<div className='question'>
			<div className='watermark-wrapper'>
				{Array.from({ length: 12 }, (i: number) => (
					<div className='watermark' key={i}>
						DevQuizzer DevQuizzer DevQuizzer
					</div>
				))}
			</div>
			<div className='head-wrapper'>
				<div className='title'>
					<div className='logo' style={{ color: category.color }}>
						<img src={category.image} alt='Logo' />
						{category.name}
					</div>
				</div>
				<Timer />
			</div>
			{!startQuiz && (
				<div className='start-quiz'>
					<div className='start-box'>
						<button className='start' onClick={() => setStartQuiz(true)}>
							Start Quiz
						</button>
						<div className='no-of-ques'>{category.questions.length} Questions</div>
					</div>
				</div>
			)}
		</div>
	);
});

export default Question;
