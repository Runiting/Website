<script>
	import { post } from '$lib/functions/utils/fetch.utils';

	post('/api/races/new', {
		name: 'Course',
		autostart: false,
		date: Date.now().toLocaleString()
	})
		.then(() => {})
		.catch((e) => {
			console.error(e);
		});
</script>
