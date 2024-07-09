import { memo, useContext } from "react";
import { FlagFill, Star, StarFill, XCircleFill } from "react-bootstrap-icons";
import "./Questions.scss";
import { QuizzContext } from "../../context/QuizContext";

const Questions = memo(() => {
	const { currentQuestion, questions } = useContext(QuizzContext);

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
					{questions[currentQuestion].options.map((option: string) => (
						<div className='option'>{option}</div>
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
