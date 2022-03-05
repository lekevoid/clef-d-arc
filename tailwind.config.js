module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		fontFamily: {
			sans: ["Roboto", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		darkTheme: "forest",
		themes: ["light", "dark", "winter", "forest"],
	},
};
