import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Drop from "../assets/drop.png";
import Setting from "../assets/setting-white.svg";
import Menu from "../assets/Menu.svg";
import Close from "../assets/Close.svg";
import Project from "../assets/Projects.svg";
import User from "../assets/user.png";

const SideBar = () => {
	const [sidebar, setSidebar] = useState(true);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

	const updateWindowDimensions = () => {
		window.innerWidth <= 1000 && setSidebar(false);
		window.innerWidth > 1000 && setSidebar(true);
	};

	useEffect(() => {
		window.addEventListener("resize", updateWindowDimensions);
	});
	useEffect(() => {
		updateWindowDimensions();
	}, []);
	const ref = useRef();
	const clickRef = useRef();
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			// If the menu is open and the clicked target is not within the menu,
			// then close the menu
			if (
				dropdownOpen &&
				ref.current &&
				!ref.current.contains(e.target) &&
				!clickRef.current.contains(e.target)
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [dropdownOpen]);
	return (
		<>
			<div>
				<div className="navbar">
					<Link to="#" className="menu-bars">
						<img
							src={Menu}
							onClick={showSidebar}
							alt="not-found"
							className="mb-4"
						/>
					</Link>
					<div className="user-info">
						<p
							className="user-name mb-0 mr-3 cpointer"
							ref={clickRef}
							onClick={toggleDropdown}>
							<img src={User} alt="user" /> Hey, John Wick{" "}
							<img src={Drop} alt="arrow-up" className="dropdown-icon" />
						</p>
						{dropdownOpen && (
							<div className="dropdown-list" ref={ref}>
								<ul className="p-0 mb-0">
									<li className="d-flex align-items-center px-3 py-1">
										john@gmail.com
									</li>
									<li className="d-flex align-items-center px-3 py-1">
										Update Password{" "}
									</li>
									<li className="d-flex align-items-center px-3 py-1">
										Sign Out
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
				<div
					className={sidebar ? "nav-menu active" : "nav-menu"}
					style={{
						minHeight: "100vh",
					}}>
					<Link to="/projects-listing" style={{ textDecoration: "none" }}>
						<div className="navbar-toggle d-flex align-items-center">
							<img className="mr-2" src={Setting} alt="setting" />
							User Guide
							<img
								src={Close}
								alt="not-found"
								className="close-icon"
								onClick={showSidebar}
							/>
						</div>
					</Link>
					<Link to="/projects-listing" style={{ textDecoration: "none" }}>
						<div className="nav-data d-flex align-items-center">
							<img className="mr-2" src={Project} alt="setting" />
							Projects
						</div>
					</Link>
				</div>
			</div>
		</>
	);
};

export default SideBar;
