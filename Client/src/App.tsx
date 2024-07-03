import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Homepage from "./pages/Home/Homepage";

const App = React.memo(() => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Homepage />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
});

export default App;
