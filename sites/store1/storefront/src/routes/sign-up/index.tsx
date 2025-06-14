import { $, component$, useSignal } from '@qwik.dev/core';
import XCircleIcon from '~/components/icons/XCircleIcon';
import { Input } from '~/Elements/Input';
import { registerCustomerAccountMutation } from '~/providers/shop/account/account';

export default component$(() => {
	const email = useSignal('');
	const firstName = useSignal('');
	const lastName = useSignal('');
	const password = useSignal('');
	const confirmPassword = useSignal('');
	const successSignal = useSignal(false);
	const error = useSignal('');
	const registerCustomer = $(async (): Promise<void> => {
		if (
			email.value === '' ||
			firstName.value === '' ||
			lastName.value === '' ||
			password.value === ''
		) {
			error.value = 'All fields are required';
		} else if (password.value !== confirmPassword.value) {
			error.value = 'Passwords do not match';
		} else {
			error.value = '';
			successSignal.value = false;

			const { registerCustomerAccount } = await registerCustomerAccountMutation({
				input: {
					emailAddress: email.value,
					firstName: firstName.value,
					lastName: lastName.value,
					password: password.value,
				},
			});
			if (registerCustomerAccount.__typename === 'Success') {
				successSignal.value = true;
			} else {
				error.value = registerCustomerAccount.message;
			}
		}
	});

	return (
		<div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 class="mt-6 text-center text-3xl text-primary-500 text-gray-900">
					Create a new account
				</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or{' '}
					<a href="/sign-in" class="font-medium text-primary-600 hover:text-primary-500">
						login to your existing account
					</a>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div class="space-y-6">
						<div>
							<label class="block text-sm font-medium text-neutral-dark">Email address</label>
							<div class="mt-1">
								<Input
									type="email"
									autoComplete="email"
									value={email.value}
									required
									onInput$={(_: any, el: any) => (email.value = el.value)}
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-neutral-dark">Firstname</label>
							<div class="mt-1">
								<Input
									type="text"
									value={firstName.value}
									required
									onInput$={(_: any, el: any) => (firstName.value = el.value)}
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-neutral-dark">Lastname</label>
							<div class="mt-1">
								<Input
									type="text"
									value={lastName.value}
									required
									onInput$={(_: any, el: any) => (lastName.value = el.value)}
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-neutral-dark">Password</label>
							<div class="mt-1">
								<Input
									type="password"
									value={password.value}
									required
									onInput$={(_: any, el: any) => (password.value = el.value)}
								/>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium text-neutral-dark">Repeat Password</label>
							<div class="mt-1">
								<Input
									type="password"
									value={confirmPassword.value}
									required
									onInput$={(_: any, el: any) => (confirmPassword.value = el.value)}
								/>
							</div>
						</div>

						{error.value !== '' && (
							<div class="rounded-md bg-red-50 p-4">
								<div class="flex">
									<div class="flex-shrink-0">
										<XCircleIcon />
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-red-800">
											We ran into a problem signing you up!
										</h3>
										<p class="text-sm text-red-700 mt-2">{error.value}</p>
									</div>
								</div>
							</div>
						)}
						<div>
							<button
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={registerCustomer}
							>
								Sign up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
