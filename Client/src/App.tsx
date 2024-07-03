import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";

const App = React.memo(() => {
	return (
		<div className="App">
			<BrowserRouter>
				<Header/>
				<Routes>
				</Routes>
			</BrowserRouter>
		</div>
	);
})

export default App;
