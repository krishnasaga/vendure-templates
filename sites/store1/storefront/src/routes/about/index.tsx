import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<section class="container mx-auto px-4 py-12 text-neutral-dark">
			<h1 class="text-4xl text-primary-500 font-bold mb-6">About Us</h1>
			<p class="text-lg text-neutral-dark mb-4">
				Welcome to our store! We're dedicated to bringing you high-quality products at great prices.
				Our mission is to make online shopping simple, enjoyable, and reliable.
			</p>
			<p class="text-lg text-neutral-dark mb-4">
				Founded in , our team works hard to provide a seamless experience from browsing to delivery.
				We believe in excellent customer service, fast shipping, and complete satisfaction. We're
				constantly improving to meet your needs and exceed your expectations.
			</p>

			<p class="text-lg text-neutral-dark">
				Thank you for choosing us. If you have any questions, feel free to{' '}
				<a href="/contact" class="text-primary-500 underline">
					contact us
				</a>
			</p>
		</section>
	);
});
