import { memo } from "react";
import Summary from "../Summary/Summary";
import "./Quiz.scss"
import Question from "../Question/Question";

const Quiz = memo(() => {
	return (
		<div className='quiz-area'>
			<div className='heading'>Quizz!</div>
			<hr />
			<div className='content'>
				<Summary />
				<Question/>
			</div>
			<hr />
		</div>
	);
});

export default Quiz;
