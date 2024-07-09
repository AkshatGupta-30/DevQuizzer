import { memo, useContext } from "react";
import "./Summary.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../oops/enum/QuestionStatus";
import Question from "../../oops/models/Question";

const Summary = memo(() => {
	const { questions, currQ, bankLength, bankPage, setBankPage } = useContext(QuizzContext);

	const getStatusCount = (status: QuestionStatus): number => {
		return questions.filter((ques) => ques.questionStatus === status).length;
	};

	const getQuestionClass = (status: QuestionStatus): string => {
		switch (status) {
			case "Current":
				return "current";
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
			<div className='answer-status'>
				<h2>Answer Status</h2>
				<div className='legends'>
					{Object.values(QuestionStatus).map((status, index) => (
						<div className='legend' key={index}>
							<div className={`color ${getQuestionClass(status)}`}>
								{index !== 0 ? getStatusCount(status as QuestionStatus) : null}
							</div>
							<label>{status}</label>
						</div>
					))}
				</div>
			</div>
			<div className='question-bank'>
				<label>Question Bank</label>
				{questions.length <= bankLength ? (
					<div className='numbers'>
						{questions.map((ques: Question, i: number) => {
							return (
								<li key={i} className={currQ === i ? "current" : getQuestionClass(ques.questionStatus)}>
									{i + 1}
								</li>
							);
						})}
					</div>
				) : (
					<>
						<div className='numbers blank-page'>
							{Array.from({ length: bankLength }, (_, i) => {
								const quesStatus = questions[(bankPage - 1) * bankLength + i].questionStatus;
								return quesStatus ? (
									<li key={i} className={getQuestionClass(quesStatus)}>
										{(bankPage - 1) * bankLength + i + 1}
									</li>
								) : (
									<li key={i}></li>
								);
							})}
						</div>
						<div className='btns'>
							{bankPage != 1 ? (
								<button className='btn' onClick={() => setBankPage(bankPage - 1)}>
									<div className='ico prev-ico'>➤</div>
									<div className='name n-one'> Previous </div>
								</button>
							) : (
								<div className='vr' style={{ background: "#f81f3f" }}></div>
							)}
							{bankPage != Math.ceil(questions.length / bankLength) ? (
								<button className='btn' onClick={() => setBankPage(bankPage + 1)}>
									<div className='name n-two'> Next </div>
									<div className='ico next-ico'>➤</div>
								</button>
							) : (
								<div className='vr' style={{ background: "#934bde" }}></div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
});

export default Summary;
