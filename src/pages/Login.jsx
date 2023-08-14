import { useContext, useEffect, useState } from "react";
import AccountElement from "../components/account/AccountElement";
import { FormInput, FormSubmit } from "../components/account/FormElements";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchRequest } from "../helper/functions";
import { Context } from "../router/RouteManager";

const Login = () => {
	const { login } = useContext(Context);
	const { loginDetails, setLoginDetails } = login;

	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});
	const [loginError, setLoginError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (loginDetails !== null) {
			navigate("/");
		}
	}, [loginDetails]);

	useEffect(() => {
		setLoginError(false);
	}, [loginForm]);

	function attemptLogin() {
		const body = {
			identifier: loginForm.username,
			password: loginForm.password,
		};

		fetchRequest(
			"http://localhost:1337/api/auth/local",
			"POST",
			body,
			"",
			validateUser
		);
	}

	function validateUser(user) {
		if (user.data === null) {
			setLoginError(true);
		} else {
			localStorage.setItem("login", JSON.stringify(user));
			setLoginDetails(user);
			navigate("/");
		}
	}

	function validateLoginForm() {
		if (loginForm.username === "" || loginForm.password === "") {
			return setLoginError(true);
		}
		attemptLogin();
	}

	return (
		<AccountElement heading="Welcome back! Glad to see you again!">
			<form className="flex flex-col gap-4">
				<FormInput
					type="text"
					label="Username"
					placeholder="Enter your username"
					value={loginForm.username}
					onChange={(e) => {
						setLoginForm((prev) => ({
							...prev,
							username: e.target.value,
						}));
					}}
				/>
				<FormInput
					type="password"
					label="Password"
					placeholder="Enter your password"
					value={loginForm.password}
					onChange={(e) => {
						setLoginForm((prev) => ({
							...prev,
							password: e.target.value,
						}));
					}}
				/>
				<a
					href=""
					className="text-sm text-[#6A707C] self-end mt-[-0.9rem]"
				>
					Forgot Password?
				</a>
				<FormSubmit
					onClick={(e) => {
						e.preventDefault();
						validateLoginForm();
					}}
					text="Login"
				/>
				{loginError && (
					<span className="text-red-500 text-sm mt-[-0.5rem]">
						Unable to login, please enter a valid username and password
					</span>
				)}
				<span className="text-center text-[#1E232C]">
					Don't have an account?{" "}
					<Link to={"/register"} className="text-[#35C2C1]">
						Register Now
					</Link>
				</span>
			</form>
		</AccountElement>
	);
};

export default Login;
