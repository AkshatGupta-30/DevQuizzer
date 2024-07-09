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
				<button type='button' className='mark'>
					<Star className='not-marked extra-icon' />
					<StarFill className='marked extra-icon' />
					<span>Mark for Review</span>
				</button>
				<button type='button' className='clear'>
					<XCircleFill />
					<span>Clear</span>
				</button>
				<button type='button' className='report'>
					<FlagFill />
					<span>Report</span>
				</button>
			</div>
		</div>
	);
});

export default Questions;
