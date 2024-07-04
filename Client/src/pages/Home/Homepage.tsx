import React, { useContext } from "react";
import "./Homepage.scss";
import LanguageCards from "../../components/LanguageCard/LanguageCard";
import CategoryContextProvider, { CategoryContext } from "../../context/CategoryContext";
import QuestionRequestModal from "../../components/QuestionRequestModal/QuestionRequestModal";

const Page = React.memo(() => {
	const { onMounted } = useContext(CategoryContext);
	const [showModal, setShowModal] = React.useState(false);
	React.useEffect(() => {
		onMounted();
	});

	const closeModal = () => setShowModal(false);

	return (
		<div id='HomePage'>
			<main>
				<section className='top'>
					<label>Welcome to DevQuizzers!</label>
					<div className='content'>
						Are you a programmer looking to test and improve your coding skills? Look no further than
						devQuizzers - the ultimate quiz app for developers!. Whether you're a seasoned programmer or
						just starting your coding journey, devQuizzers offers a fun and engaging way to challenge
						yourself and stay on top of your game. With a wide range of quizzes covering various programming
						languages and topics, you'll never run out of ways to put your knowledge to the test.
					</div>
				</section>
				<section className='quizzes'>
					<div className='heading'>
						<label>Computer Skills!</label>
						<form>
							<div className='search'>
								<i className='fa-solid fa-magnifying-glass search-icon'></i>
								<input className='search-input' type='search' placeholder='Search' />
							</div>
						</form>
					</div>
					<hr />
					<div className='language-cards'>
						<LanguageCards />
					</div>
					<hr />
					<button id='add-questions' onClick={() => setShowModal(true)}>
						<i className='fa-solid fa-plus add-icon'></i>Add a Question Request
					</button>
					{showModal && <QuestionRequestModal closeModal={closeModal} />}
				</section>
				<section className='bottom'>
					<label>Stay Up-to-Date</label>
					<div className='content'>
						The world of programming is constantly evolving, with new languages, frameworks, and best
						practices emerging all the time. devQuizzers helps you stay ahead of the curve by offering
						quizzes on the latest technologies and trends. Keep your skills sharp and your mind agile as you
						navigate the ever-changing landscape of software development.
					</div>
				</section>
			</main>
		</div>
	);
});

const Homepage = React.memo(() => {
	return (
		<CategoryContextProvider>
			<Page />
		</CategoryContextProvider>
	);
});

export default Homepage;
