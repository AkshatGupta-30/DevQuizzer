/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useEffect } from "react";
import { FlagFill, Star, StarFill, XCircleFill } from "react-bootstrap-icons";
import "./Questions.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../oops/enum/QuestionStatus";

const Questions = memo(() => {
	const { currentQuestion, questions, myAns, setMyAns } = useContext(QuizzContext);

	useEffect(() => {
		if (questions[currentQuestion].questionStatus === QuestionStatus.NotVisited) {
			questions[currentQuestion].questionStatus = QuestionStatus.NotAnswered;
		}
	}, [currentQuestion]);

	return (
		<div className='questions'>
			<div className='details'>
				<div className='name'>
					<div className='number'>Q{currentQuestion + 1}.</div>
					<div
						className='ques'
						dangerouslySetInnerHTML={{
							__html: questions[currentQuestion].ques,
						}}></div>
				</div>
				<div className='options'>
					{questions[currentQuestion].options.map((option: string, i: number) => (
						<div
							key={i}
							className={`option ${myAns[currentQuestion] == i ? "selected" : null}`}
							onClick={() => {
								setMyAns((prevAns) => {
									const updatedAns = [...prevAns];
									if (updatedAns[currentQuestion] === i) {
										updatedAns[currentQuestion] = -1;
										questions[currentQuestion].questionStatus = QuestionStatus.NotAnswered;
									} else {
										updatedAns[currentQuestion] = i;
										questions[currentQuestion].questionStatus = QuestionStatus.Answered;
									}
									return updatedAns;
								});
							}}>
							{option}
						</div>
					))}
				</div>
			</div>
			<div className='extra-btns'>
				<button
					type='button'
					className='mark'
					onClick={() => {
						if (questions[currentQuestion].questionStatus !== QuestionStatus.MarkForReview) {
							questions[currentQuestion].questionStatus = QuestionStatus.MarkForReview;
						} else {
							questions[currentQuestion].questionStatus =
								myAns[currentQuestion] != -1 ? QuestionStatus.Answered : QuestionStatus.NotAnswered;
						}
					}}>
					{questions[currentQuestion].questionStatus === QuestionStatus.MarkForReview ? (
						<StarFill className='marked extra-icon' />
					) : (
						<Star className='not-marked extra-icon' />
					)}

					<span>Mark for Review</span>
				</button>
				<button
					type='button'
					className='clear'
					onClick={() => {
						questions[currentQuestion].questionStatus = QuestionStatus.NotAnswered;
						setMyAns((prevAns) => {
							const updatedAns = [...prevAns];
							updatedAns[currentQuestion] = -1;
							return updatedAns;
						});
					}}>
					<XCircleFill />
					<span>Clear</span>
				</button>
				<button type='button' className='report'>
					{/* //TODO: Implement dialog box */}
					<FlagFill />
					<span>Report</span>
				</button>
			</div>
		</div>
	);
});

export default Questions;
