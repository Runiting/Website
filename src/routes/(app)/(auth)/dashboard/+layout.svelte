<script>
	import LinkNav from '$lib/components/atoms/LinkNav.svelte';
</script>

<div class="__">
	<div class="menu">
		<div class="user-informations">
			<!-- <img src="me.jpg" alt="User Avatar" /> -->
			<h1>John DOE</h1>
			<p>john.doe@email.com</p>
		</div>

		<nav>
			<ul>
				<LinkNav link="/dashboard" title="Dashboard" icon="home-outline" />
				<LinkNav link="/dashboard/races" title="Races" icon="flag-outline" />

				<LinkNav link="/dashboard/sponsors" title="Sponsors" icon="people-outline" />
				<LinkNav link="/dashboard/statistics" title="Statistics" icon="stats-chart-outline" />
			</ul>
		</nav>
	</div>

	<div class="page-container">
		<slot />
	</div>
</div>

<style lang="scss">
	.__ {
		background-color: var(--gray-900);

		display: flex;
		flex-direction: row;
		height: 100vh;
		width: 100%;

		.menu {
			width: 300px;
			border-right: 1px solid var(--a-gray-100);
			background-color: var(--gray-800);

			.user-informations {
				display: flex;
				flex-direction: column;
				padding: 24px;

				border-bottom: 1px solid var(--a-gray-100);
				margin-bottom: 15px;

				img {
					width: 64px;
					height: 64px;
					border-radius: 50%;
				}

				h1 {
					font-size: 24px;
					margin-top: 16px;
					color: white;
					font-weight: 400;
				}

				p {
					color: #d3c7da;
					font-size: 14px;
					font-weight: 200;
				}
			}

			nav {
				ul {
					list-style: none;
				}
			}
		}

		.page-container {
			width: 100%;
		}
	}
</style>
