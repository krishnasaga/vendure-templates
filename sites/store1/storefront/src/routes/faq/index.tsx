import { component$ } from '@builder.io/qwik';

export default component$(() => {
	const faqs = [
		{
			question: 'How can I track my order?',
			answer: 'Click on "Track Your Order" in the navigation bar and enter your order ID.',
		},
		{
			question: 'What is your return policy?',
			answer:
				'We accept returns within 30 days of delivery. Items must be unused and in original packaging.',
		},
		{
			question: 'How long does shipping take?',
			answer: 'Shipping typically takes 3-7 business days depending on your location.',
		},
		{
			question: 'Can I cancel my order?',
			answer: 'Yes, orders can be canceled within 24 hours of placing them.',
		},
		{
			question: 'Do you offer international shipping?',
			answer: 'Currently, we ship only within the country. International shipping is coming soon!',
		},
	];

	return (
		<div class="container mx-auto px-4 py-10">
			<h1 class="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
			<div class="space-y-4 max-w-3xl mx-auto">
				{faqs.map((faq, index) => (
					<div key={index} class="bg-white p-4 border rounded-lg shadow">
						<h2 class="text-lg font-semibold">{faq.question}</h2>
						<p class="mt-2 text-gray-700">{faq.answer}</p>
					</div>
				))}
			</div>
		</div>
	);
});
