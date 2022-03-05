<template>
	<div class="container my-12 px-6 md:px-auto">
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
			<RouterLink to="/rdv">Rendez-vous</RouterLink>
			<label class="swap text-9xl">
				<!-- this hidden checkbox controls the state -->
				<input type="checkbox" />
				<div class="swap-on" @click="setTheme('forest')">❄</div>
				<div class="swap-off" @click="setTheme('winter')">🌲</div>
			</label>
		</nav>
		<RouterView v-if="store.user" />
		<Auth v-else />
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { store } from "./stores/supabase.js";
import { supabase } from "./supabase";
import { RouterLink, RouterView } from "vue-router";

import Auth from "./components/Auth.vue";
import Profile from "./components/Profile.vue";

export default {
	components: {
		Auth,
		Profile,
	},

	setup() {
		let theme = ref("winter");
		if (localStorage.theme === "forest" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			theme.value = "forest";
		}

		function setTheme(to) {
			if (theme.value !== to) {
				theme.value = to;
			}

			localStorage.theme = to;

			document.documentElement.dataset.theme = theme.value;
		}

		function toggleTheme() {
			const toggleTo = theme.value === "winter" ? "forest" : "winter";
			console.log(toggleTo);
			setTheme(toggleTo);
		}

		setTheme(theme.value);

		store.user = supabase.auth.user();
		supabase.auth.onAuthStateChange((_, session) => {
			store.user = session.user;
		});

		onMounted(() => {
			setTheme(theme.value);
		});

		return {
			theme,
			store,
			toggleTheme,
			setTheme,
		};
	},
};
</script>

<style scoped>
#app {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	width: 100%;
	font-weight: normal;
}

header {
	line-height: 1.5;
	max-height: 100vh;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

a,
.green {
	text-decoration: none;
	color: hsla(160, 100%, 37%, 1);
	transition: 0.4s;
}

@media (hover: hover) {
	a:hover {
		background-color: hsla(160, 100%, 37%, 0.2);
	}
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

@media (min-width: 1024px) {
	body {
		display: flex;
		place-items: center;
	}

	#app {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0 2rem;
	}

	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
}
</style>
