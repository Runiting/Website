<script>
	import { goto } from '$app/navigation';

	import { post } from '$lib/functions/utils/fetch.utils';
	import { newNotification } from '$lib/functions/utils/notifications.utils';

	import { onMount } from 'svelte';

	onMount(async () => {
		post('/api/auth/isLoggedIn').catch((error) => {
			newNotification(
				{
					type: 'error',
					title: 'Access Forbiden',
					description: 'You must be logged in to be able to access this resource'
				},
				10
			);
			goto('/auth/login');
		});
	});
</script>
