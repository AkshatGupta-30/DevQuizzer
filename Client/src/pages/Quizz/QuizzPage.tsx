import { memo } from "react";
import { useLocation } from "react-router-dom";
import "./QuizzPage.scss";
import QuizzContextProvider from "../../context/QuizContext";
import Quiz from "../../components/Quiz/Quiz";
import Category from "../../oops/models/Category";

const Page = memo(() => {
	const location = useLocation();
	const category: Category = location.state.category;

	return (
		<div className='quizz'>
			<div className='title'>
				<div className='logo' style={{ color: category.color }}>
					<img src={category.image} alt='Logo' />
					{category.name}
				</div>
			</div>
			<Quiz />
		</div>
	);
});

const QuizzPage = memo(() => {
	const location = useLocation();
	const category: Category = location.state.category;

	return (
		<QuizzContextProvider category={category}>
			<Page />
		</QuizzContextProvider>
	);
});

export default QuizzPage;
