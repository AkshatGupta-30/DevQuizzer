import { memo } from "react";
import Summary from "../Summary/Summary";
import "./Quiz.scss"

const Quiz = memo(() => {
	return (
		<div className='quiz-area'>
			<div className='heading'>Quizz!</div>
			<hr />
			<div className='content'>
                <Summary />
			</div>
			<hr />
		</div>
	);
});

export default Quiz;
