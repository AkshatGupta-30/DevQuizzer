import { Fragment, memo, useContext } from "react";
import { QuizzContext } from "../../context/QuizContext";
import "./QuestionPanel.scss";

const Watermark = () => {
	const { category } = useContext(QuizzContext);
	return (
		<div className='watermark-wrapper'>
			{Array.from({ length: 12 }, (_,i: number) => (
				<Fragment key={category.questions[i]}>
					<div className='watermark' key={category.questions[i] + 'water'}>
						DevQuizzer DevQuizzer DevQuizzer
					</div>
					<div className='watermark' key={category.questions[i] + 'mark'}>
						&nbsp;&nbsp;&nbsp;DevQuizzer DevQuizzer&nbsp;&nbsp;&nbsp;
					</div>
				</Fragment>
			))}
		</div>
	);
};

const Timer = memo(() => {
	const { formattedTime } = useContext(QuizzContext);
	return (
		<div className='timer-wrapper'>
			<div className='timer'>Timer&nbsp;-&nbsp;</div>
			<div className='numbers'>
				<span className='digits'>{formattedTime}</span>
			</div>
		</div>
	);
});

const HeadWrapper = memo(() => {
	const { category } = useContext(QuizzContext);

	return (
		<div className='head-wrapper'>
			<div className='title'>
				<div className='logo' style={{ color: category.color }}>
					<img src={category.image} alt='Logo' />
					{category.name}
				</div>
			</div>
			<Timer />
		</div>
	);
});

const StartQuiz = memo(() => {
	const { category, setStartQuiz } = useContext(QuizzContext);

	return (
		<div className='start-quiz'>
			<div className='start-box'>
				<button className='start' onClick={() => setStartQuiz(true)}>
					Start Quiz
				</button>
				<div className='no-of-ques'>{category.questions.length} Questions</div>
			</div>
		</div>
	);
});

const QuestionPanel = memo(() => {
	const { startQuiz } = useContext(QuizzContext);

	return (
		<div className='question'>
			<Watermark />
			<HeadWrapper />
			{!startQuiz && <StartQuiz />}
		</div>
	);
});

export default QuestionPanel;
