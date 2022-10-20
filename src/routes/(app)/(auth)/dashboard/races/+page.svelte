<script>
	import Button from '$lib/components/atoms/Button.svelte';
	import TextInput from '$lib/components/atoms/TextInput.svelte';
	import RaceResult from '$lib/components/molecules/RaceResult.svelte';
	import { get, post } from '$lib/functions/utils/fetch.utils';
	import { onMount } from 'svelte';

	let races = [];

	onMount(() => {
		get('/api/races')
			.then((data) => {
				races = data.data;
			})
			.catch((e) => {
				console.error(e);
			});
	});
</script>

<!-- ${JSON.stringify(races)} -->

<div class="container">
	<h1>Races</h1>

	<div class="search-box">
		<TextInput label="Search" name="search" placeholder="Race name" />
	</div>

	<div class="result-container">
		<div class="result-list">
			{#each races as race}
				<RaceResult {race} />
			{/each}
		</div>
		<div class="result-details">
			<!-- <p>result</p> -->
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			color: #fff;
			padding: 30px;
		}

		.search-box {
			background-color: var(--a-gray-200);
			width: 90%;
			padding: 15px;
			border-radius: 10px;
		}

		.result-container {
			width: 90%;
			margin: 30px;
			display: flex;
			flex-direction: row;

			.result-list,
			.result-details {
				width: 50%;
			}
		}
	}
</style>
