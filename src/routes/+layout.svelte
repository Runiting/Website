<script>
	import Notifications from '$lib/components/organisms/Notifications.svelte';
	import { notifications } from '$lib/stores/app.stores';
</script>

<div class="_">
	<slot />
	<Notifications />
</div>

<style lang="scss">
	:root {
		--main-background: #161923;
		--light-gray: #7e7f82;
		--button-color: #1855c6;

		--gray-100: #f2f4f7;
		--gray-200: #e6e8f0;
		--gray-300: #ccced8;
		--gray-400: #9ea2b2;
		--gray-500: #6a7084;
		--gray-600: #474c5f;
		--gray-700: #2e3446;
		--gray-800: #1d212e;
		--gray-900: #161923;

		--a-gray-100: hsla(210, 100%, 99%, 0.97);
		--a-gray-200: hsla(229, 73%, 97%, 0.95);
		--a-gray-300: hsla(231, 88%, 97%, 0.85);
		--a-gray-400: hsla(229, 93%, 94%, 0.7);
		--a-gray-500: hsla(227, 96%, 90%, 0.52);
		--a-gray-600: hsla(228, 86%, 86%, 0.38);
		--a-gray-700: hsla(225, 90%, 81%, 0.28);
		--a-gray-800: hsla(226, 77%, 78%, 0.19);
		--a-gray-900: hsla(226, 90%, 80%, 0.14);
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;

		font-family: 'Poppins', sans-serif;
	}

	._ {
		position: relative;
	}
</style>
