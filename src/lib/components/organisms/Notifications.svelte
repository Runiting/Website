<script>
	import { notifications } from '$lib/stores/app.stores';
	import Notification from '../molecules/Notification.svelte';
</script>

<div class="frame">
	{#each $notifications as notif}
		<Notification {notif} />
	{/each}
</div>

<style lang="scss">
	.frame {
		top: 0;
		left: 0;
		position: absolute;
		pointer-events: none;
		padding: 25px;
		z-index: 100;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		gap: 25px;
		overflow: hidden;
	}
</style>
