<template>
	<div class="container">
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
			<RouterLink to="/rdv">Rendez-vous</RouterLink>
		</nav>
		<RouterView v-if="store.user" />
		<Auth v-else />
	</div>
</template>

<script>
import { store } from "./stores/supabase.js";
import { supabase } from "./supabase";
import { RouterLink, RouterView } from "vue-router";

import Auth from "./components/Auth.vue";
import Profile from "./components/Profile.vue";

import "@/assets/base.css";

export default {
	components: {
		Auth,
		Profile,
	},

	setup() {
		store.user = supabase.auth.user();
		supabase.auth.onAuthStateChange((_, session) => {
			store.user = session.user;
		});

		return {
			store,
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

.container {
	padding: 50px 40px 100px;
	box-sizing: border-box;
	width: 100%;
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
