<script>
	import { deleteNotification } from '$lib/functions/utils/notifications.utils';

	import { onMount } from 'svelte';

	import { tweened } from 'svelte/motion';

	export let notif;

	onMount(() => {
		progress.set(0);
	});

	const progress = tweened(1, {
		duration: notif.exp
	});

	progress.subscribe((n) => {
		if (n === 0) {
			deleteNotification(notif.uuid);
		}
	});
</script>

<div class="notification-box">
	<span style:height="{$progress * 100}%" class={notif.type} />

	<div class="notification">
		<div>
			<h3>{notif.title}</h3>
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

		.success {
			width: 15px;
			height: inherit;
			background-color: green;
		}

		.notification {
			pointer-events: all;
			background: white;
			padding: 5px;
			padding-left: 10px;

			width: 350px;
			height: fit-content;
		}
	}
</style>
