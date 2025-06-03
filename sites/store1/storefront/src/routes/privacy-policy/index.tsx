import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<section class="container mx-auto px-4 py-12 text-neutral-dark">
			<h1 class="text-4xl text-primary-500 font-bold mb-6">Privacy Policy</h1>
			<p class="mb-4">
				Your privacy is important to us. This privacy policy explains how we collect, use, and
				protect your personal information.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-2">1. Information We Collect</h2>
			<p class="mb-4">
				We collect information such as your name, email address, and payment information when you
				place an order or subscribe to our newsletter.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-2">
				2. How We Use Your Information
			</h2>
			<p class="mb-4">
				We use your information to process orders, improve our services, send promotional emails,
				and ensure a personalized shopping experience.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-2">
				3. Sharing Your Information
			</h2>
			<p class="mb-4">
				We do not sell your personal data. We may share it with trusted third-party services to help
				us operate our website and fulfill your orders.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-2">4. Cookies</h2>
			<p class="mb-4">
				Our website uses cookies to improve user experience and track analytics. You can control
				cookie settings in your browser.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-2">5. Your Rights</h2>
			<p class="mb-4">
				You have the right to access, correct, or delete your personal data. Contact us if you have
				any requests or concerns.
			</p>

			<h2 class="text-2xl text-secondary-500 font-semibold mt-8 mb-2">6. Changes to This Policy</h2>
			<p class="mb-4">
				We may update this privacy policy from time to time. Changes will be posted on this page
				with an updated effective date.
			</p>

			<p class="mt-8 text-sm text-neutral-accent">Effective date: June 3, 2025</p>
		</section>
	);
});
