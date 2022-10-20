<script>
	import MapBox from '$lib/components/organisms/MapBox.svelte';
	import { get } from '$lib/functions/utils/fetch.utils';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { newNotification } from '$lib/functions/utils/notifications.utils';

	let race;
	let day, hours, minutes, seconds;
	let owner = false;
	let distance = 0;
	export let data;

	const timeRemaining = (endDate) => {
		const now = new Date();
		const delta = (endDate - now) / 1000;

		day = parseInt(delta / 60 / 60 / 24);
		day = day < 10 ? '0' + day : day;

		hours = parseInt((delta / 60 / 60) % 24);
		hours = hours < 10 ? '0' + hours : hours;

		minutes = parseInt((delta / 60) % 60);
		minutes = minutes < 10 ? '0' + minutes : minutes;

		seconds = parseInt(delta % 60);
		seconds = seconds < 10 ? '0' + seconds : seconds;
	};

	onMount(() => {
		race = data.race;
		race.date = new Date(race.date);

		setInterval(() => {
			timeRemaining(race.date);
		}, 1000);
	});
</script>

{#if race}
	<h1 class="race-name">
		{race.name}

		{#if owner}
			<ion-icon name="create-outline" />
		{/if}
	</h1>

	<div class="race-informations">
		<div class="race-informations-left">
			<div class="race-info">
				<h3>Event Date</h3>
				<h4>
					{race.date.toLocaleDateString('fr-FR') +
						' - ' +
						race.date.getHours() +
						':' +
						race.date.getMinutes()}
				</h4>
			</div>

			<div class="race-info">
				<h3>Runners</h3>
				<h4>
					{race.runners.length || 0}
				</h4>
			</div>

			<div class="race-info">
				<h3>Distance</h3>
				<h4>
					{distance || 0} km(s)
				</h4>
			</div>
		</div>
		<div class="race-info remain-time-container">
			<h3>Time Remaining</h3>
			<h4>{day}d {hours}h {minutes}m {seconds}s</h4>
		</div>

		<div class="joinCode-container">
			<h3>Join Code</h3>
			<div
				on:click={() => {
					navigator.clipboard.writeText(race.joinCode);
					newNotification(
						{
							type: 'success',
							title: 'Copy to clipboard',
							description: 'Join Code successfully copy to clipboard'
						},
						3
					);
				}}
			>
				<h4 class="joinCode">{race.joinCode} <span><ion-icon name="copy-outline" /></span></h4>
			</div>
		</div>
	</div>

	<div class="race-cols">
		<div class="col">Classement</div>
		<div class="col">
			<MapBox bind:distance mapSymbols={race.circuit} />
		</div>
	</div>
{/if}

<style lang="scss">
	.race-name {
		color: #fff;
		margin: 30px;
	}

	.race-informations {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		margin: 30px;
		padding: 15px;

		background-color: var(--a-gray-600);
		border-radius: 10px;
		color: #fff;

		.race-info {
			margin-left: 60px;

			&:first-child {
				margin-left: 30px;
			}

			h4 {
				color: var(--a-gray-400);
			}
		}

		.remain-time-container {
			text-align: center;
			margin-left: 0px;
		}

		.race-informations-left {
			display: flex;
			flex-direction: row;
		}

		.joinCode-container {
			align-self: flex-end;

			background-color: var(--gray-100);
			color: var(--gray-900);
			border-radius: 10px;
			padding: 10px 15px;

			ion-icon:hover {
				cursor: pointer;
			}

			h3 {
				color: var(--gray-900);
			}

			h4,
			span {
				color: var(--gray-500);

				margin-left: 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}

	.race-cols {
		display: flex;
		flex-direction: row;

		width: 90%;
		margin: 5%;

		.col {
			display: flex;
			width: 50%;
		}
	}
</style>
