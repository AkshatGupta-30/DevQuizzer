import { memo } from "react";
import Category from "../../models/Category";
import "./Summary.scss"

const Summary = memo(({ category }: { category: Category }) => {
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
						<div className='color green'>0</div>
						<label>Answered</label>
					</div>
					<div className='legend'>
						<div className='color purple'>0</div>
						<label>Mark for Review</label>
					</div>
					<div className='legend'>
						<div className='color yellow'>0</div>
						<label>Not Answered</label>
					</div>
					<div className='legend'>
						<div className='color outline'>0</div>
						<label>Not Visited</label>
					</div>
				</div>
			</div>
			<div className='question-bank'>
				<label>Question Bank</label>
				<div className='numbers'>
					{Array.from({ length: category.questions.length }, (_, i) => (
						<li key={i + 1}>{i + 1}</li>
					))}
				</div>
			</div>
		</div>
	);
});

export default Summary