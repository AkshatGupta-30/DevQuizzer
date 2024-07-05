import { memo } from "react";
import { useLocation } from "react-router-dom";
import Category from "../../models/Category";
import "./QuizzPage.scss";

const Page = memo(() => {
	const location = useLocation();
	const category: Category = location.state.category;

	return (
		<div className='quizz'>
			<div className='title'>
				<div className='logo' style={{color: category.color}}>
					<img src={category.image} alt='Logo' />
					{category.name}
				</div>
			</div>
		</div>
	);
});

const QuizzPage = memo(() => {
	return <Page />;
});

export default QuizzPage;
