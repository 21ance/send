/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				urbanist: ["UrbanistRegular", "sans-serif"],
				roboto: ["RobotoRegular", "sans-serif"],
			},
		},
	},
	plugins: [],
};
