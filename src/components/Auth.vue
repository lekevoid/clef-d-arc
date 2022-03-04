<template>
	<button type="submit" @click="googleLogin">
		<img src="../assets/logo_google.svg" />
	</button>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase";

import logo_google from "../assets/logo_google.svg";

export default {
	setup() {
		const loading = ref(false);
		const email = ref("");

		const googleLogin = async () => {
			try {
				loading.value = true;
				console.log(import.meta.env.VITE_PUBLIC_SITE_URL);
				const { user, session, error } = await supabase.auth.signIn(
					{
						provider: "google",
					},
					{
						redirectTo: import.meta.env.VITE_PUBLIC_SITE_URL,
					}
				);
				if (error) throw error;
			} catch (error) {
				alert(error.error_description || error.message);
			} finally {
				loading.value = false;
			}
		};

		return {
			loading,
			email,
			googleLogin,
		};
	},
};
</script>
