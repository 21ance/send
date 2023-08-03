import { useEffect, useState } from "react";

const Login = () => {
	const [loginDetails, setLoginDetails] = useState({
		username: "",
		password: "",
	});
	const [loginError, setLoginError] = useState(false);

	useEffect(() => {
		setLoginError(false);
	}, [loginDetails]);

	const fetchUser = async () => {
		try {
			const res = await fetch("http://localhost:1337/api/auth/local", {
				method: "POST",
				body: JSON.stringify({
					identifier: loginDetails.username,
					password: loginDetails.password,
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
		}
	}

	function validateLogin(e) {
		e.preventDefault();
		if (loginDetails.username === "" || loginDetails.password === "") {
			return setLoginError(true);
		}
		fetchUser();
	}

	return (
		<main className="px-8 font-urbanist flex flex-col justify-center h-screen">
			<h1 className="text-3xl font-bold min-w-[auto] max-w-[16ch] py-8">
				Welcome back! Glad to see you again!
			</h1>
			<form action="" className="flex flex-col gap-4">
				<FormInput
					type="text"
					placeholder="Enter your username"
					value={loginDetails.username}
					onChange={(e) => {
						setLoginDetails((prev) => ({
							...prev,
							username: e.target.value,
						}));
					}}
				/>
				<FormInput
					type="password"
					placeholder="Enter your password"
					value={loginDetails.password}
					onChange={(e) => {
						setLoginDetails((prev) => ({
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
				<button
					type="submit"
					className="bg-[#1E232C] rounded-lg h-[56px] text-white mt-6"
					onClick={(e) => validateLogin(e)}
				>
					Login
				</button>
				{loginError && (
					<span className="text-red-500 text-sm mt-[-0.5rem]">
						Unable to login, please enter a valid username and password
					</span>
				)}
				<span className="text-center text-[#1E232C]">
					Don't have an account?{" "}
					<a href="" className="text-[#35C2C1]">
						Register Now
					</a>
				</span>
			</form>
		</main>
	);
};

const FormInput = (props) => {
	const { type, placeholder, value, onChange } = props;

	return (
		<input
			type={type}
			placeholder={placeholder}
			className="bg-[#F7F8F9] rounded-lg border-[1px] border-[#DADADA] p-2 placeholder:text-[#8391A1] focus:outline-[#1E232C] font-sans"
			value={value}
			onChange={onChange}
		/>
	);
};

export default Login;
