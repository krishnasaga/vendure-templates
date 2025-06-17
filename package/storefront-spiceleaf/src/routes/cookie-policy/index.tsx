import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<div class="max-w-4xl mx-auto p-6 text-gray-800">
			<h1 class="text-3xl font-bold mb-4">Cookie Policy</h1>
			<p class="mb-4">
				This Cookie Policy explains how SPICELEAF (“we”, “us”, or “our”) uses cookies and similar
				technologies when you visit our website at www.spiceleaf.com.
			</p>

			<h2 class="text-2xl font-semibold mt-6 mb-2">1. What Are Cookies?</h2>
			<p class="mb-4">
				Cookies are small text files stored on your device to help websites remember information
				about your visit. They can improve your experience by remembering preferences and enabling
				key functionality.
			</p>

			<h2 class="text-2xl font-semibold mt-6 mb-2">2. Types of Cookies We Use</h2>
			<ul class="list-disc list-inside mb-4">
				<li>
					<strong>Essential Cookies:</strong> Necessary for the operation of our site.
				</li>
				<li>
					<strong>Performance Cookies:</strong> Help us understand how users interact with the site.
				</li>
				<li>
					<strong>Functionality Cookies:</strong> Remember choices to enhance your experience.
				</li>
				<li>
					<strong>Advertising Cookies:</strong> Used to deliver ads relevant to you.
				</li>
			</ul>

			<h2 class="text-2xl font-semibold mt-6 mb-2">3. How to Manage Cookies</h2>
			<p class="mb-4">
				You can manage or disable cookies through your browser settings. Please note that disabling
				cookies may affect site functionality.
			</p>

			<h2 class="text-2xl font-semibold mt-6 mb-2">4. Third-Party Cookies</h2>
			<p class="mb-4">
				We may use services such as Google Analytics that set their own cookies to collect traffic
				data. These third parties are responsible for how they use your information.
			</p>

			<h2 class="text-2xl font-semibold mt-6 mb-2">5. Changes to This Policy</h2>
			<p class="mb-4">
				We may update this Cookie Policy from time to time. Please review it periodically for any
				changes.
			</p>

			<p class="mt-6">
				If you have questions about our Cookie Policy, contact us at:{' '}
				<strong>support@spiceleaf.com</strong>
			</p>
		</div>
	);
});
