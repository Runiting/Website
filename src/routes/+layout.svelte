<script>
	import Notifications from '$lib/components/organisms/Notifications.svelte';
	import { notifications } from '$lib/stores/app.stores';
</script>

<div class="_">
	<slot />
	<Notifications />
</div>

<style>
	._ {
		position: relative;
	}
</style>
