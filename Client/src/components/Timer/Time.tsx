import { memo, useContext } from "react";
import { QuizzContext } from "../../context/QuizContext";

const Timer = memo(() => {
	const { formattedTime } = useContext(QuizzContext);
	return (
		<div className='timer-wrapper'>
			<div className='timer'>Timer&nbsp;-&nbsp;</div>
			<div className='numbers'>
				<span className='digits'>{formattedTime}</span>
			</div>
		</div>
	);
});

export default Timer;
