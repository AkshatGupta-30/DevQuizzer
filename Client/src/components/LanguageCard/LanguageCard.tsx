import React from "react";
import "./LanguageCard.scss";
import { Img } from "react-image";

const Card = React.memo(
	({ label, ques, image, color }: { label: string; image: string; ques: number; color: string }) => {
		return (
			<div id='card' style={{ borderColor: color }}>
				<Img src={image} alt={label} className='svg' />
				<label>{label}</label>
				<div className='questions'>{ques} Questions</div>
			</div>
		);
	}
);

const LanguageCards = React.memo(() => {
	return (
		<div className='all-langs'>
			<Card label={"Flutter"} image='https://www.svgrepo.com/show/373604/flutter.svg' ques={5} color='cyan' />
			<Card label={"React"} image='https://www.svgrepo.com/show/452092/react.svg' ques={5} color='blue' />
			<Card label={"React"} image='https://www.svgrepo.com/show/452092/react.svg' ques={5} color='blue' />
			<Card label={"React"} image='https://www.svgrepo.com/show/452092/react.svg' ques={5} color='blue' />
			<Card label={"React"} image='https://www.svgrepo.com/show/452092/react.svg' ques={5} color='blue' />
			<Card label={"React"} image='https://www.svgrepo.com/show/452092/react.svg' ques={5} color='blue' />
			<Card label={"React"} image='https://www.svgrepo.com/show/452092/react.svg' ques={5} color='blue' />
		</div>
	);
});

export default LanguageCards;
