<script>
	import { goto } from '$app/navigation';

	import Button from '$lib/components/atoms/Button.svelte';
	import TextInput from '$lib/components/atoms/TextInput.svelte';
	import { post } from '$lib/functions/utils/fetch.utils';
	import { newNotification } from '$lib/functions/utils/notifications.utils';
	import { getFormErrors } from '$lib/functions/utils/zod.utils';
	import { loginSchema } from '$lib/schemas/auth';

	let email, password;

	let emptyErrors = {
		email: [],
		password: []
	};

	let errors = { ...emptyErrors };

	const onSubmitForm = async (event) => {
		event.preventDefault();
		errors = { ...emptyErrors };

		let userInformations = {
			email,
			password
		};

		const schema = loginSchema.safeParse(userInformations);

		if (!schema.success) {
			errors = getFormErrors(schema.error.issues);
			return;
		}

		await post('/api/auth/login', userInformations)
			.then((data) => {
				console.log(data);
				goto('/dashboard');
			})
			.catch((error) => {
				console.log(error);
				newNotification({
					type: 'error',
					title: 'Login failed',
					description: error.errors
				});
			});
	};
</script>

<svelte:window
	on:keypress={(e) => {
		e.which == 13 ? onSubmitForm(e) : null;
	}}
/>

<div class="body-container">
	<div class="left-col col">
		<main>
			<h1>Login</h1>

			<form action="">
				<TextInput
					name="email"
					placeholder="john.doe@email.com"
					label="Email"
					bind:content={email}
					error={errors.email}
				/>
				<TextInput
					name="password"
					placeholder="●●●●●●●●●●●●●●●●"
					label="Password"
					bind:content={password}
					error={errors.password}
					secret="true"
				/>
			</form>
			<Button clickFunction={onSubmitForm} content="Validate" />
		</main>
	</div>
	<div class="right-col col">
		<p />
	</div>
</div>

<style lang="scss">
	.body-container {
		background: var(--gray-900);

		display: flex;
		flex-direction: row;

		width: 100%;
		height: 100vh;

		.col {
			width: 50%;
		}

		.left-col {
			background-color: #fff;

			display: flex;
			flex-direction: column;

			align-items: center;
			justify-content: center;

			main {
				display: flex;
				flex-direction: column;
				align-items: center;

				h1 {
					font-weight: 300;
					font-size: 2.5rem;

					margin-bottom: 30px;
				}

				form {
					display: flex;
					flex-direction: column;

					.col {
						padding: 30px;
						padding-bottom: 5px;
					}
				}

				.inform {
					width: 400px;
					text-align: justify;
					font-size: 0.8rem;
					margin-bottom: 30px;
				}
			}
		}
	}
</style>
