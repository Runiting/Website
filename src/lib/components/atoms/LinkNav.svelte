<script>
	import { page } from '$app/stores';

	export let link;
	export let title;
	export let icon;
</script>

<a href={link}
	><li class={link === $page.url.pathname ? 'active' : ''}>
		<ion-icon name={icon} /><span>{title}</span>
	</li></a
>

<style lang="scss">
	a {
		text-decoration: none;

		li {
			cursor: pointer;
			color: white;
			display: flex;
			flex-direction: row;
			align-items: center;

			height: 48px;

			padding-left: 24px;

			ion-icon {
				padding-right: 16px;
				font-size: 24px;
			}

			span {
				font-size: 14px;
			}
		}
	}

	.active {
		background-color: var(--button-color);
		border-radius: 0px 10px 10px 0px;
	}
</style>
