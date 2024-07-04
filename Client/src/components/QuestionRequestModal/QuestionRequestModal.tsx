import React from "react";
import "./QuestionRequestModal.scss";
import { CategoryContext } from "../../context/CategoryContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";

const QuestionRequestModal = React.memo(({ closeModal }: { closeModal: () => void }) => {
	const { categories } = React.useContext(CategoryContext);

	React.useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "scroll";
		};
	});

	return ReactDOM.createPortal(
		<>
			<div className='background' onClick={closeModal}></div>
			<div id='ques-request'>
				<button
					type='button'
					className='close-btn'
					onClick={() => {
						closeModal();
					}}>
					<FontAwesomeIcon icon={faXmark} className='icon' />
				</button>
				<h1>Add Question Request</h1>
				<form>
					<label>Category</label>
					<select id='Category' name='category'>
						<option value='Category' disabled>
							Category
						</option>
						{categories.map((cat, index) => (
							<option key={index} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
					<label>Question</label>
					<input type='text' autoComplete='off' name='question' required />
					<label>Option 1</label>
					<input type='text' autoComplete='off' name='option1' required />
					<label>Option 2</label>
					<input type='text' autoComplete='off' name='option2' required />
					<label>
						Option 3<span>(Optional)</span>
					</label>
					<input type='text' autoComplete='off' name='option3' />
					<label>
						Option 4<span>(Optional)</span>
					</label>
					<input type='text' autoComplete='off' name='option4' />
					<label>Answer</label>
					<input type='number' min={1} max={4} autoComplete='off' name='answer' required />
					<label>Difficulty</label>
					<select id='Difficulty' name='difficulty'>
						<option value='Difficulty' disabled>
							Difficulty
						</option>
						<option value='Easy'>Easy</option>
						<option value='Medium'>Medium</option>
						<option value='Hard'>Hard</option>
					</select>
					<label>Explaination</label>
					<input type='text' autoComplete='off' name='explaination' required />
					<label>LinkedIn Username</label>
					<input type='text' autoComplete='off' name='linkedIn' />

					<div className='btn-container'>
						<button type='button' id='cancel' onClick={closeModal}>
							Cancel
						</button>
						<button type='submit' id='send'>
							Send
						</button>
					</div>
				</form>
			</div>
        </>,
        document.querySelector(".modal-portal")! 
	);
});

export default QuestionRequestModal;
