<script>
	import { goto } from '$app/navigation';
	import TextInput from '$lib/components/atoms/TextInput.svelte';
	import { newNotification } from '$lib/functions/utils/notifications.utils';
	import { AccessError } from 'edgedb';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (!data.race.isIn) {
			newNotification(
				{
					type: 'error',
					title: 'Bad Link',
					description: 'The link you provide seems to be incorrect'
				},
				10
			);
			goto('/');
		} else {
			console.log(data);
		}
	});
</script>

<div class="container">
	<div class="form-container">
		<h2>Promesse de don</h2>

		<p>Soutient kilométrique pour le coureur</p>

		<!-- <TextInput placeholder="John" label="FirstName" /> -->
	</div>
</div>

<style lang="scss">
	.container {
		background-color: var(--main-background);
		height: 100vh;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.form-container {
			background-color: white;
			padding: 30px;
			border-radius: 10px;

			.phrase {
				display: flex;
				flex-direction: row;
				align-items: center;

				input {
					padding: 2px 10px;
					margin: 5px;

					border: 1px solid var(--gray-900);
					border-radius: 10px;
					outline: none;

					font-size: 12px;
					height: 30px;
				}
			}

			.race-name {
				font-weight: bold;
				margin-left: 15px;
			}
		}
	}
</style>
