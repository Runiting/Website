<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/atoms/Button.svelte';

	import Loader from '$lib/components/atoms/Loader.svelte';
	import TextInput from '$lib/components/atoms/TextInput.svelte';
	import { post } from '$lib/functions/utils/fetch.utils';
	import { newNotification } from '$lib/functions/utils/notifications.utils';
	import { getFormErrors } from '$lib/functions/utils/zod.utils';
	import { signUpSchema } from '$lib/schemas/auth';

	let email, firstname, lastname, password, phone;

	let emptyErrors = {
		email: [],
		lastname: [],
		firstname: [],
		password: [],
		phone: []
	};

	let errors = { ...emptyErrors };

	let submitted = false;

	const onSubmitForm = async (event) => {
		event.preventDefault();
		submitted = true;
		errors = { ...emptyErrors };

		let user = {
			email,
			firstname,
			lastname,
			password,
			phone
		};

		const schema = signUpSchema.safeParse(user);

		if (!schema.success) {
			errors = getFormErrors(schema.error.issues);
			submitted = false;
			return;
		}

		await post('/api/auth/signup', user)
			.then((data) => {
				newNotification(
					{
						type: 'success',
						title: 'Account created !',
						description:
							'Your account has been successfully created. You will be redirect in few seconds'
					},
					5
				);

				goto('/');
			})
			.catch((error) => {
				console.error(error);
			});
	};
</script>

<div class="body-container">
	<div class="left-col col">
		{#if !submitted}
			<main>
				<h1>Ready to run ?</h1>

				<form action="">
					<div class="col">
						<TextInput
							name="firstname"
							placeholder="John"
							label="Firstname"
							bind:content={firstname}
							error={errors.firstname}
						/>
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
							secret={true}
						/>
					</div>
					<div class="col">
						<TextInput
							name="lastname"
							placeholder="Doe"
							label="Lastname"
							bind:content={lastname}
							error={errors.lastname}
						/>
						<TextInput
							name="phone"
							placeholder="+33 7 10 20 30 40"
							label="Phone"
							required={false}
							bind:content={phone}
							error={errors.phone}
						/>
					</div>
				</form>

				<p class="inform">
					Password must contain at least one uppercase letter, one lowercase letter, one number and
					one special character.
				</p>

				<Button clickFunction={onSubmitForm} content="Next" width="50" />
			</main>
		{:else}
			<main>
				<h1>We are creating your account please wait...</h1>
				<Loader />
			</main>
		{/if}
	</div>
	<div class="right-col col">
		<p />
	</div>
</div>

<style lang="scss">
	.body-container {
		background: linear-gradient(to right, #41295a, #2f0743);

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
				}

				form {
					display: flex;
					flex-direction: row;

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

				button {
					background: #41295a;
					border: none;

					height: 56px;
					width: 50%;

					border-radius: 10px;
					color: #fff;

					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}
</style>
