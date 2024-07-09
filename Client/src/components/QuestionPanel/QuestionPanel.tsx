/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, memo, useContext, useEffect, useMemo, useState } from "react";
import { QuizzContext } from "../../context/QuizContext";
import "./QuestionPanel.scss";
import Questions from "../Questions/Questions";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Watermark = () => (
	<div className='watermark-wrapper'>
		{Array.from({ length: 12 }, (_, i: number) => (
			<Fragment key={i}>
				<div className='watermark'>DevQuizzer DevQuizzer DevQuizzer</div>
				<div className='watermark'>&nbsp;&nbsp;&nbsp;DevQuizzer DevQuizzer&nbsp;&nbsp;&nbsp;</div>
			</Fragment>
		))}
	</div>
);

const Timer = memo(() => {
	const { startQuiz } = useContext(QuizzContext);
	const [time, setTime] = useState<number>(0);

	useEffect(() => {
		if (startQuiz) {
			const startTime = Date.now();
			let animationFrameId: number;

			const updateTimer = () => {
				setTime(Date.now() - startTime);
				animationFrameId = requestAnimationFrame(updateTimer);
			};

			animationFrameId = requestAnimationFrame(updateTimer);

			return () => {
				cancelAnimationFrame(animationFrameId);
			};
		}
	}, [startQuiz]);

	const formattedTime: string = useMemo(() => {
		const hours = String(Math.floor((time / 3600000) % 60)).padStart(2, "0");
		const minutes = String(Math.floor((time / 60000) % 60)).padStart(2, "0");
		const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	}, [time]);

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
	const { questions, setCurrQ, setStartQuiz } = useContext(QuizzContext);

	return (
		<div className='start-quiz'>
			<div className='start-box'>
				<button
					className='start'
					onClick={() => {
						setCurrQ(0);
						setStartQuiz(true);
					}}>
					Start Quiz
				</button>
				<div className='no-of-ques'>{questions.length} Questions</div>
			</div>
		</div>
	);
});

const FootWrapper = memo(() => {
	const { currQ, setCurrQ, questions, bankPage, setBankPage, bankLength } = useContext(QuizzContext);

	return (
		<div className='foot-wrapper'>
			{currQ ? (
				<button
					className='nav-btns'
					onClick={() => {
						if (currQ === (bankPage - 1) * bankLength) {
							setBankPage(bankPage - 1);
						}
						setCurrQ(currQ - 1);
					}}>
					<FontAwesomeIcon icon={faChevronLeft} />
					Previous Question
				</button>
			) : (
				<div></div>
			)}
			<div className='vr'></div>
			{currQ != questions.length - 1 && (
				<button
					className='nav-btns'
					onClick={() => {
						if (currQ + 1 === bankPage * bankLength) {
							setBankPage(bankPage + 1);
						}
						setCurrQ(currQ + 1);
					}}>
					Next Question
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			)}
		</div>
	);
});

const QuestionPanel = memo(() => {
	const { startQuiz } = useContext(QuizzContext);

	return (
		<div className='question-panel'>
			<Watermark />
			<HeadWrapper />
			{!startQuiz && <StartQuiz />}
			{startQuiz && <Questions />}
			{startQuiz && <FootWrapper />}
			{/* <FootWrapper /> */}
		</div>
	);
});

export default QuestionPanel;
