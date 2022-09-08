<script>
	import { deleteNotification } from '$lib/functions/utils/notifications.utils';

	import { onMount } from 'svelte';

	import { tweened } from 'svelte/motion';

	export let notif;

	onMount(() => {
		if (notif.exp != undefined) {
			progress.set(0);
		}
	});

	const progress = tweened(1, {
		duration: notif.exp * 1000
	});

	progress.subscribe((n) => {
		if (n === 0) {
			deleteNotification(notif.uuid);
		}
	});
</script>

<div class="notification-box">
	<span style:height="{$progress * 100}%" class="{notif.type} notif-type" />

	<div class="notification">
		<div class="notification-header">
			<div class="notification-title">
				<h3>{notif.title}</h3>
			</div>
			<div class="notification-close">
				<ion-icon on:click={deleteNotification(notif.uuid)} name="close-outline" />
			</div>
		</div>
		<div>
			<p>{notif.description}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.notification-box {
		display: flex;
		flex-direction: row;
		background: white;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

		.notif-type {
			width: 15px;
			height: inherit;
		}

		.success {
			background-color: green;
		}

		.error {
			background-color: red;
		}

		.notification {
			pointer-events: all;
			background: white;
			padding: 5px;
			padding-left: 10px;

			width: 350px;
			height: fit-content;

			.notification-header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.notification-close {
					margin-right: 10px;

					ion-icon {
						font-size: 22px;
						&:hover {
							cursor: pointer;
						}
					}
				}
			}
		}
	}
</style>
