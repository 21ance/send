import { useEffect, useState } from "react";
import AccountElement from "../components/account/AccountElement";
import { FormInput, FormSubmit } from "../components/account/FormElements";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = (props) => {
	const { loginDetails, setLoginDetails } = props;
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

	const fetchUser = async () => {
		try {
			const res = await fetch("http://localhost:1337/api/auth/local", {
				method: "POST",
				body: JSON.stringify({
					identifier: loginForm.username,
					password: loginForm.password,
				}),
				headers: {
					"Content-type": "application/json",
				},
			});
			const data = await res.json();
			validateUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	function validateUser(user) {
		if (user.data === null) {
			setLoginError(true);
		} else {
			localStorage.setItem("login", JSON.stringify(user));
			setLoginDetails(user);
			navigate("/");
		}
	}

	function validateLogin(e) {
		e.preventDefault();
		if (loginForm.username === "" || loginForm.password === "") {
			return setLoginError(true);
		}
		fetchUser();
	}

	return (
		<AccountElement heading="Welcome back! Glad to see you again!">
			<form action="" className="flex flex-col gap-4">
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
				<FormSubmit onClick={(e) => validateLogin(e)} text="Login" />
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
