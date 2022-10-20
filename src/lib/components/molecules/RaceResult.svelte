<script>
	import { goto } from '$app/navigation';

	import Button from '../atoms/Button.svelte';

	export let race;

	const gotoPage = (joinCode) => {
		goto('/dashboard/races/' + joinCode);
	};
</script>

<div class="race-container">
	<div class="race-informations">
		<div class="race-header">
			<h2>{race.name || 'Race Name'}</h2>
		</div>
		<div class="race-description">
			<span class="race-date"
				>{new Date(race.date).toLocaleDateString('fr-FR') || '12/01/2022	'}</span
			>
			<span>-</span>
			<span>{race.owner.fullname || 'Owner'}</span>
		</div>
	</div>
	<div class="race-actions">
		<Button content="View" clickFunction={() => gotoPage(race.joinCode)} />
	</div>
</div>

<style lang="scss">
	.race-container {
		display: flex;
		flex-direction: row;
		background-color: var(--a-gray-300);
		margin: 10px 0px;
		border-radius: 10px;
		padding: 5px 10px;

		justify-content: space-between;

		&:hover {
			cursor: pointer;
		}

		.race-informations {
			display: flex;
			flex-direction: column;

			.race-description {
				span {
					font-size: 16px;
				}

				.race-date {
				}
			}
		}
	}
</style>
