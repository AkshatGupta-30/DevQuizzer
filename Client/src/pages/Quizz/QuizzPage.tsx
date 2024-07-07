import { memo } from "react";
import { useLocation } from "react-router-dom";
import Category from "../../models/Category";
import "./QuizzPage.scss";
import QuizzContextProvider from "../../context/QuizContext";
import Quiz from "../../components/Quiz/Quiz";

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
			<Quiz category={category}/>
		</div>
	);
});

const QuizzPage = memo(() => {
	return (
		<QuizzContextProvider>
			<Page />
		</QuizzContextProvider>
	);
});

export default QuizzPage;
