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
			case QuestionStatus.Answered:
				return "answered";
			case QuestionStatus.MarkForReview:
				return "review";
			case QuestionStatus.NotAnswered:
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
					<div className='legend'>
						<div className='color answered'>{getStatusCount(QuestionStatus.Answered)}</div>
						<label>Answered</label>
					</div>
					<div className='legend'>
						<div className='color review'>{getStatusCount(QuestionStatus.MarkForReview)}</div>
						<label>Mark for Review</label>
					</div>
					<div className='legend'>
						<div className='color not-answered'>{getStatusCount(QuestionStatus.NotAnswered)}</div>
						<label>Not Answered</label>
					</div>
					<div className='legend'>
						<div className='color not-visited'>{getStatusCount(QuestionStatus.NotVisited)}</div>
						<label>Not Visited</label>
					</div>
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
