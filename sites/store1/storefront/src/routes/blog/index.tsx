import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<section class="container mx-auto px-4 py-12 text-neutral-dark">
			<h1 class="text-4xl font-bold mb-6">Our Blog</h1>
			<p class="text-lg mb-8">
				Stay up to date with tips, stories, product updates, and more from our team.
			</p>

			{/* Example blog post cards - you can later fetch these dynamically */}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div class="border rounded-xl p-6 shadow hover:shadow-md transition">
					<h2 class="text-2xl font-semibold mb-2">How to Choose the Perfect Gadget</h2>
					<p class="text-neutral-accent mb-4">
						Find the best tech gear for your needs with our expert tips.
					</p>
					<a href="#" class="text-primary-500 font-medium underline">
						Read more
					</a>
				</div>

				<div class="border rounded-xl p-6 shadow hover:shadow-md transition">
					<h2 class="text-2xl font-semibold mb-2">Top Home Essentials in 2025</h2>
					<p class="text-neutral-accent mb-4">
						Explore our latest picks for making your space more functional and cozy.
					</p>
					<a href="#" class="text-primary-500 font-medium underline">
						Read more
					</a>
				</div>

				<div class="border rounded-xl p-6 shadow hover:shadow-md transition">
					<h2 class="text-2xl font-semibold mb-2">Sustainability Matters</h2>
					<p class="text-neutral-accent mb-4">
						Learn how we’re improving packaging and processes to reduce our impact.
					</p>
					<a href="#" class="text-primary-500 font-medium underline">
						Read more
					</a>
				</div>
			</div>
		</section>
	);
});
