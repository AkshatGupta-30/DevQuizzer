import React, { useContext } from "react";
import "./LanguageCard.scss";
import { Img } from "react-image";
import { CategoryContext } from "../../context/CategoryContext";
import Category from "../../models/Category";

const Card = React.memo((category: Category) => {
	return (
		<div id='card' style={{ borderColor: category.color }}>
			<Img src={category.image} alt={category.name} className='svg' />
			<label>{category.name}</label>
			<div className='questions'>{category.questionsCount} Questions</div>
		</div>
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
