import { memo } from "react";
import { FlagFill, Star, StarFill, XCircleFill } from "react-bootstrap-icons";
import "./Questions.scss";

const Questions = memo(() => {
	return (
		<div className='questions'>
			<div className='details'>
				<div className='name'>
					<div className='number'>Q1.</div>
					<div
						className='ques'
						dangerouslySetInnerHTML={{
							__html: "What is the output of the following code?\n\nx = 5\ny = 10\nprint(x + y)",
						}}></div>
				</div>
				<div className='options'>
					<div className='option'>15</div>
					<div className='option'>10</div>
					<div className='option'>5</div>
					<div className='option'>0</div>
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
