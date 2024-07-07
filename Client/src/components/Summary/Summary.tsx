import { memo, useContext } from "react";
import "./Summary.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../enum/QuestionStatus";

const Summary = memo(() => {
	const { quesStatus } = useContext(QuizzContext);

	const getStatusCount = (status: QuestionStatus): number => {
		return quesStatus.filter((s) => s === status).length;
	};

	const getQuestionClass = (status: QuestionStatus): string => {
		switch (status) {
			case "Answered":
				return "answered";
			case "Mark For Review":
				return "review";
			case "Not Answered":
				return "not-answered";
			default:
				return "not-visited";
		}
	};

	return (
		<div className='summary'>
			<div className='timer'>
				<label>Timer</label>
				<span>00:00:00</span>
			</div>
			<div className='answer-status'>
				<h2>Answer Status</h2>
				<div className='legends'>
					{Object.values(QuestionStatus).map((status, index) => (
						<div className='legend' key={index}>
							<div className={`color ${getQuestionClass(status)}`}>
								{getStatusCount(status as QuestionStatus)}
							</div>
							<label>{status}</label>
						</div>
					))}
				</div>
			</div>
			<div className='question-bank'>
				<label>Question Bank</label>
				<div className='numbers'>
					{quesStatus.map((q: QuestionStatus, i: number) => {
						return (
							<li key={i} className={getQuestionClass(q)}>
								{i + 1}
							</li>
						);
					})}
				</div>
			</div>
		</div>
	);
});

export default Summary;
