import { component$ } from '@builder.io/qwik';

export default component$(() => {
	return (
		<footer class="bg-secondary-200 py-5">
			<div class="container mx-auto px-4">
				<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h2 class="font-bold text-neutral-dark mb-4">SHOP</h2>
						<ul>
							<li>
								<a href="#" class="text-neutral-accent hover:text-neutral-darkest">
									Dairy Products
								</a>
							</li>
							<li>
								<a href="#" class="text-neutral-accent hover:text-neutral-darkest">
									Spices and Masala
								</a>
							</li>
							<li>
								<a href="#" class="text-neutral-accent hover:text-neutral-darkest">
									Dry Fruits and Nuts
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 class="font-bold text-neutral-dark mb-4">SUPPORT</h2>
						<ul>
							<li>
								<a href="/contact" class="text-neutral-accent hover:text-neutral-darkest">
									Help
								</a>
							</li>
							<li>
								<a href="/track" class="text-neutral-accent hover:text-neutral-darkest">
									Track order
								</a>
							</li>
							<li>
								<a href="#" class="text-neutral-accent hover:text-neutral-darkest">
									Shipping
								</a>
							</li>
							<li>
								<a href="#" class="text-neutral-accent hover:text-neutral-darkest">
									Returns
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 class="font-bold text-neutral-dark mb-4">COMPANY</h2>
						<ul>
							<li>
								<a href="/about" class="text-neutral-accent hover:text-neutral-darkest">
									About
								</a>
							</li>
							<li>
								<a href="/blog" class="text-neutral-accent hover:text-neutral-darkest">
									Blog
								</a>
							</li>
							<li>
								<a href="/privacy-policy" class="text-neutral-accent hover:text-neutral-darkest">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="/cookie-policy" class="text-neutral-accent hover:text-neutral-darkest">
									Cookie Policy
								</a>
							</li>
							<li>
								<a href="/terms-conditions" class="text-neutral-accent hover:text-neutral-darkest">
									Terms & Conditions
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 class="font-bold text-neutral-dark mb-4">SUBSCRIBE TO OUR NEWSLETTER</h2>
						<p class="text-neutral-accent mb-4">
							Be the first to know about exclusive offers & deals.
						</p>
						<form>
							<input
								type="email"
								placeholder="Enter your email"
								class="border border-neutral-accent-light p-2 w-full mb-4"
							/>
							<button type="submit" class="bg-primary-500 text-neutral-light p-2 w-full">
								Subscribe
							</button>
						</form>
					</div>
				</div>
			</div>
		</footer>
	);
});
