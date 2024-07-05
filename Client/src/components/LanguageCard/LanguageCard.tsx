import React, { useContext } from "react";
import "./LanguageCard.scss";
import { Img } from "react-image";
import { CategoryContext } from "../../context/CategoryContext";
import Category from "../../models/Category";
import { Link } from "react-router-dom";

const Card = React.memo((category: Category) => {
	return (
		<Link
			to={`/quizz/${category.name}`}
			state={{ category: category }}
			className='card'
			style={{ borderColor: category.color }}>
			<Img src={category.image} alt={category.name} className='svg' />
			<label>{category.name}</label>
			<div className='questions'>{category.questions.length} Questions</div>
		</Link>
	);
});

const LanguageCards = React.memo(() => {
	const { categories } = useContext(CategoryContext);
	return (
		<div className='all-langs'>
			{categories.map((category: Category) => {
				return <Card {...category} key={category.id} />;
			})}
		</div>
	);
});

export default LanguageCards;
