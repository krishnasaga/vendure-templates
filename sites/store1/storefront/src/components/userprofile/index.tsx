import { component$ } from '@builder.io/qwik';

export const LoginSignup = component$(() => {
	return (
		<div class=" min-h-screen bg-[#fdfbf5] text-[#3f2a14] px-4">
			<div class="container mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full bg-white rounded-lg p-4">
				{/* Login Section */}
				<div>
					<h2 class="text-3xl font-bold mb-2">Login</h2>
					<p class="mb-6">If you've created an account with us, please enter.</p>

					<label class="block mb-2 font-bold">EMAIL</label>
					<input type="email" placeholder="Email" class="w-full border p-3 mb-4 rounded" />

					<label class="block mb-2 font-bold">PASSWORD</label>
					<input type="password" placeholder="Password" class="w-full border p-3 mb-2 rounded" />

					<a href="#" class="text-orange-500 text-sm mb-4 inline-block">
						Forgot your password?
					</a>

					<button class="w-full bg-[#4b341e] text-white font-bold py-3 mt-4 rounded hover:bg-[#3a2715]">
						SIGN IN
					</button>
				</div>

				{/* Register Section */}
				<div>
					<h2 class="text-3xl font-bold mb-4">Create an account</h2>
					<p class="mb-8">
						Registering for this site allows you to access your order status and history. We’ll get
						a new account set up for you in no time. This will only ask you for info to make the
						purchase process faster and easier.
					</p>
					<button class="w-full bg-[#4b341e] text-white font-bold py-3 rounded hover:bg-[#3a2715]">
						CREATE ACCOUNT
					</button>
				</div>
			</div>
		</div>
	);
});
