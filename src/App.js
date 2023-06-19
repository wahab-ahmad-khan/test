import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import ProjectsListing from "./screens/ProjectsListing";
import ProjectDetail from "./screens/ProjectDetail";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/projects-listing" element={<ProjectsListing />} />
			<Route path="/project-detail" element={<ProjectDetail />} />
		</Routes>
	);
}

export default App;
