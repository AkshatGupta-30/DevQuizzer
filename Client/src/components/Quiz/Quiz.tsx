import { memo } from "react";
import Category from "../../models/Category";
import Summary from "../Summary/Summary";
import "./Quiz.scss"

const Quiz = memo(({ category }: { category: Category }) => {
	return (
		<div className='quiz-area'>
			<div className='heading'>Quizz!</div>
			<hr />
			<div className='content'>
                <Summary category={category} />
			</div>
			<hr />
		</div>
	);
});

export default Quiz;
