import React from "react";
import Design from "../assets/lgoin-design.svg";
import Setting from "../assets/setting.svg";
import { Link } from "react-router-dom";
const Login = () => {
	return (
		<>
			<div className="wrapper">
				<div className="row min-vh-100 m-0 p-0">
					<div className="col-lg-6 col-md-6 col-sm-12 min-vh-100 min-sm-vh-40 d-flex align-items-center justify-content-center p-3">
						<img className="img-fluid" src={Design} alt="design" />
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 min-vh-100 min-sm-vh-60 d-flex align-items-center justify-content-center p-3">
						<form className="login-form d-flex align-items-center justify-content-center">
							<div className="login-fields-wrapper text-center">
								<h1 className="login-heading lite-black d-flex align-items-center justify-content-center">
									<img className="mr-1" src={Setting} alt="setting" />
									User Guide
								</h1>
								<div className="row m-0 p-0 w-100">
									<div className="col-12">
										<div className="floating-label-textfield mt-5">
											<input
												placeholder=" "
												type="email"
												onChange={(e) => console.log("Value: ", e.target.value)}
												required
											/>
											<label>Email</label>
										</div>
									</div>
									<div className="col-12">
										<div className="floating-label-textfield mt-3">
											<input
												placeholder=" "
												type="password"
												onChange={(e) => console.log("Value: ", e.target.value)}
												required
											/>
											<label>Password</label>
										</div>
									</div>
								</div>
								<Link to="/projects-listing">
									<button className="btn mt-5">Login</button>
								</Link>
								<h6 className="secondary-heading mt-3">
									Don't have an account yet?{" "}
									<b style={{ textDecoration: "underline" }}>Sign Up</b>
								</h6>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
