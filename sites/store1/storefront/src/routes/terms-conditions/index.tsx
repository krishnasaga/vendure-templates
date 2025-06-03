import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div class="container mx-auto px-4 py-12 text-neutral-dark">
			<h1 class="text-4xl text-primary-500 font-bold mb-6">Terms and Conditions</h1>

			<p class="mb-4">
				Welcome to SpiceLeaf! These terms and conditions outline the rules and regulations for the
				use of our website and services.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
			<p class="mb-4">
				By accessing this website, you agree to be bound by these terms and all applicable laws. If
				you do not agree, please do not use our services.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-6 mb-2">2. Products & Services</h2>
			<p class="mb-4">
				We aim to provide accurate descriptions of our products. However, we do not guarantee that
				all product information is 100% accurate, current, or error-free.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-6 mb-2">3. Orders & Payment</h2>
			<p class="mb-4">
				All payments must be made securely through the available payment methods. We reserve the
				right to cancel or refuse any order at our discretion.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-6 mb-2">4. Intellectual Property</h2>
			<p class="mb-4">
				All content, including logos, text, graphics, and images, is the property of SpiceLeaf and
				is protected by copyright laws.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-6 mb-2">
				5. Limitation of Liability
			</h2>
			<p class="mb-4">
				We shall not be held responsible for any indirect, incidental, or consequential damages
				arising from the use of our website or products.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-6 mb-2">6. Governing Law</h2>
			<p class="mb-4">
				These terms shall be governed and interpreted in accordance with the laws of [Your
				Country/State].
			</p>

			<p class="mt-8">
				If you have any questions, feel free to contact us at support@spiceleaf.com.
			</p>
		</div>
	);
});
