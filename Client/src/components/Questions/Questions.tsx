/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useContext, useEffect } from "react";
import { FlagFill, Star, StarFill, XCircleFill } from "react-bootstrap-icons";
import "./Questions.scss";
import { QuizzContext } from "../../context/QuizContext";
import { QuestionStatus } from "../../oops/enum/QuestionStatus";

const Questions = memo(() => {
	const { currQ, questions, setQuestions, myAns, setMyAns } = useContext(QuizzContext);

	useEffect(() => {
		if (questions[currQ].questionStatus === QuestionStatus.NotVisited) {
			const updatedQuestions = [...questions];
			updatedQuestions[currQ].questionStatus = QuestionStatus.NotAnswered;
			setQuestions(updatedQuestions);
		}
	}, [currQ, questions]);

	return (
		<div className='questions'>
			<div className='details'>
				<div className='name'>
					<div className='number'>Q{currQ + 1}.</div>
					<div
						className='ques'
						dangerouslySetInnerHTML={{
							__html: questions[currQ].ques,
						}}></div>
				</div>
				<div className='options'>
					{questions[currQ].options.map((option: string, i: number) => (
						<div
							key={i}
							className={`option ${myAns[currQ] == i ? "selected" : null}`}
							onClick={() => {
								setMyAns((prevAns) => {
									const updatedAns = [...prevAns];
									if (updatedAns[currQ] === i) {
										updatedAns[currQ] = -1;
										questions[currQ].questionStatus = QuestionStatus.NotAnswered;
									} else {
										updatedAns[currQ] = i;
										questions[currQ].questionStatus = QuestionStatus.Answered;
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
						const updatedQuestions = [...questions];
						if (updatedQuestions[currQ].questionStatus !== QuestionStatus.MarkForReview) {
							updatedQuestions[currQ].questionStatus = QuestionStatus.MarkForReview;
						} else {
							updatedQuestions[currQ].questionStatus =
								myAns[currQ] !== -1 ? QuestionStatus.Answered : QuestionStatus.NotAnswered;
						}
						setQuestions(updatedQuestions);
					}}>
					{questions[currQ].questionStatus === QuestionStatus.MarkForReview ? (
						<StarFill className='marked extra-icon' />
					) : (
						<Star className='not-marked extra-icon' />
					)}

					<span>
						{questions[currQ].questionStatus === QuestionStatus.MarkForReview ? "Marked" : "Mark"} for
						Review
					</span>
				</button>
				<button
					type='button'
					className='clear'
					onClick={() => {
						questions[currQ].questionStatus = QuestionStatus.NotAnswered;
						setMyAns((prevAns) => {
							const updatedAns = [...prevAns];
							updatedAns[currQ] = -1;
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
