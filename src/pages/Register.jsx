import { useEffect, useState } from "react";
import AccountElement from "../components/account/AccountElement";
import {
	FormInput,
	FormSubmit,
	FormError,
} from "../components/account/FormElements";

const Register = () => {
	const [registerDetails, setRegisterDetails] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [registerError, setRegisterError] = useState(false);

	useEffect(() => {
		setRegisterError(false);
	}, [registerDetails]);

	function validateRegister(e) {
		e.preventDefault();

		if (validateFormFields() === true) {
			registerUser();
		}
	}

	function validateFormFields() {
		const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		if (registerDetails.username.length < 3) {
			return setRegisterError((prev) => ({
				...prev,
				username: "Username must be at least 3 characters",
			}));
		}
		if (!registerDetails.email.match(validEmailRegex)) {
			return setRegisterError((prev) => ({
				...prev,
				email: "Please enter a valid email address",
			}));
		}
		if (registerDetails.password.length < 6) {
			return setRegisterError((prev) => ({
				...prev,
				password: "Password must be at least 6 characters",
				confirmPassword: "Password does not match",
			}));
		} else if (
			registerDetails.password !== registerDetails.confirmPassword ||
			registerDetails.confirmPassword === ""
		) {
			return setRegisterError((prev) => ({
				...prev,
				confirmPassword: "Password does not match",
			}));
		}

		return true;
	}

	const registerUser = async () => {
		try {
			const res = await fetch(
				"http://localhost:1337/api/auth/local/register",
				{
					method: "POST",
					body: JSON.stringify({
						username: registerDetails.username,
						email: registerDetails.email,
						password: registerDetails.password,
					}),
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			const data = await res.json();
			validateUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	function validateUser(user) {
		console.log(user);
		if (user.data === null) {
			setRegisterError((prev) => ({
				...prev,
				username: "Username or email are already taken",
				email: "Username or email are already taken",
			}));
		} else {
			localStorage.setItem("login", JSON.stringify(user));
		}
	}

	return (
		<AccountElement heading="Welcome! Create your account now!">
			<form action="" className="flex flex-col gap-4">
				<FormInput
					type="text"
					label="Enter your username"
					placeholder="Username"
					value={registerDetails.username}
					onChange={(e) => {
						setRegisterDetails((prev) => ({
							...prev,
							username: e.target.value,
						}));
					}}
				/>
				{registerError.username !== false && (
					<FormError text={registerError.username} />
				)}
				<FormInput
					type="text"
					label="Email"
					placeholder="Enter your email"
					value={registerDetails.email}
					onChange={(e) => {
						setRegisterDetails((prev) => ({
							...prev,
							email: e.target.value,
						}));
					}}
				/>
				{registerError.email !== false && (
					<FormError text={registerError.email} />
				)}
				<FormInput
					type="password"
					label="Password"
					placeholder="Enter your password"
					value={registerDetails.password}
					onChange={(e) => {
						setRegisterDetails((prev) => ({
							...prev,
							password: e.target.value,
						}));
					}}
				/>
				{registerError.password !== false && (
					<FormError text={registerError.password} />
				)}
				<FormInput
					type="password"
					label="Confirm Password"
					placeholder="Re-enter your password"
					value={registerDetails.confirmPassword}
					onChange={(e) => {
						setRegisterDetails((prev) => ({
							...prev,
							confirmPassword: e.target.value,
						}));
					}}
				/>
				{registerError.confirmPassword !== false && (
					<FormError text={registerError.confirmPassword} />
				)}
				<FormSubmit
					onClick={(e) => validateRegister(e)}
					text="Register Account"
				/>
			</form>
		</AccountElement>
	);
};

export default Register;
