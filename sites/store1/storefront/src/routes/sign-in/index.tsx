import { $, component$, useSignal } from '@qwik.dev/core';
import { useNavigate } from '@qwik.dev/router';
import XCircleIcon from '~/components/icons/XCircleIcon';
import { loginMutation } from '~/providers/shop/account/account';

export default component$(() => {
	const navigate = useNavigate();
	const email = useSignal('');
	const password = useSignal('');
	const rememberMe = useSignal(true);
	const error = useSignal('');

	const login = $(async () => {
		const { login } = await loginMutation(email.value, password.value, rememberMe.value);
		if (login.__typename === 'CurrentUser') {
			navigate('/account');
		} else {
			error.value = login.message;
		}
	});
	return (
		<div class="w-full min-h-[calc(100vh-100px)]">
			<div class={'container grid sm:grid-col-1 md:grid-cols-2 h-full min-h-[calc(100vh-100px)]'}>
				<div
					class={'flex flex-col items-start justify-center h-full border-r-2 border-neutral-light'}
				>
					<div class={'w-full pr-10'}>
						<h2 class={'mt-6 text-4xl text-neutral-dark font-bold'}>Login</h2>
						<p class="my-4 text-neutral-darkest">
							If you've created an account with us, please enter.
						</p>
						<div class="bg-white">
							<div class="space-y-6">
								<div>
									<label class="block text-sm font-bold text-neutral-dark">EMAIL</label>
									<div class="mt-1">
										<input
											type="email"
											autoComplete="email"
											value={email.value}
											required
											onInput$={(_, el) => (email.value = el.value)}
											class="text-md appearance-none block w-full p-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
										/>
									</div>
								</div>

								<div>
									<label class="block text-sm font-bold text-neutral-dark">PASSWORD</label>
									<div class="mt-1">
										<input
											type="password"
											value={password.value}
											required
											onInput$={(_, el) => (password.value = el.value)}
											onKeyUp$={(ev, el) => {
												if (ev.key === 'Enter' && !!el.value) {
													login();
												}
											}}
											class="text-md appearance-none block w-full p-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
										/>
									</div>
								</div>

								<div class="flex items-center justify-between">
									<div class="flex items-center">
										<input
											type="checkbox"
											checked
											onChange$={(_, el) => (rememberMe.value = el.checked)}
											class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
										/>
										<label class="ml-2 block text-sm text-neutral-dark">Remember me</label>
									</div>

									<div class="text-sm">
										<button
											onClick$={() => navigate('/forgot-password')}
											class="font-medium text-primary-600 hover:text-primary-500"
										>
											Forgot your password?
										</button>
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
													We ran into a problem signing you in!
												</h3>
												<p class="text-sm text-red-700 mt-2">{error.value}</p>
											</div>
										</div>
									</div>
								)}
								<div>
									<button
										class="w-full bg-primary-500 text-white font-bold py-3 mt-4 rounded hover:bg-primary-800"
										onClick$={login}
									>
										Sign in
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class={'flex flex-col items-center justify-center pl-10'}>
					<div class={'w-full'}>
						<h2 class="mt-6 text-4xl text-neutral-dark font-bold">Create an account</h2>
						<p class={'my-4 text-neutral-darkest'}>
							Creating an account allows you to view your order status and history. We'll set up
							your new account quickly and only ask for the information needed to make your shopping
							experience faster and easier.
						</p>
						<a href="/sign-up" class="font-medium text-secondary-500 hover:text-neutral">
							<button
								class={
									'w-full bg-secondary-500 text-white font-bold py-3 mt-4 rounded hover:bg-secondary-800'
								}
							>
								CREATE ACCOUNT
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
});
