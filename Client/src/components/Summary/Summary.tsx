import { memo, useContext } from "react";
import "./Summary.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../oops/enum/QuestionStatus";

const Summary = memo(() => {
	const { quesStatus, bankLength, bankPage, setBankPage } = useContext(QuizzContext);

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
				{quesStatus.length <= bankLength ? (
					<div className='numbers'>
						{quesStatus.map((q: QuestionStatus, i: number) => {
							return (
								<li key={i} className={getQuestionClass(q)}>
									{i + 1}
								</li>
							);
						})}
					</div>
				) : (
					<>
						<div className='numbers blank-page'>
							{Array.from({ length: bankLength }, (_, i) => {
								const q = quesStatus[(bankPage - 1) * bankLength + i];
								return q ? (
									<li key={i} className={getQuestionClass(q)}>
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
							{bankPage != Math.ceil(quesStatus.length / bankLength) ? (
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
