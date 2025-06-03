import { APP_STATE } from '~/constants';
import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import { Link } from '@qwik.dev/router'; // Make sure this import path is correct for your setup

export default component$(() => {
	const isMenuOpen = useSignal(false);

	const appState = useContext(APP_STATE);
	const collections = appState.collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const toggleCart = $(() => {
		appState.showCart = !appState.showCart;
	});

	return (
		<header class="bg-neutral-light border-b-[3px] border-primary-500 relative z-20">
			<div class="container mx-auto px-4 py-3 flex items-center justify-between">
				{/* Mobile menu button */}
				<button onClick$={() => (isMenuOpen.value = true)} class="md:hidden text-neutral-dark">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				{/* Logo */}
				<a href="/" class="flex items-center space-x-2">
					<img src="/logo.png" alt="Store Logo" class="h-14 w-auto" object-fit="contain" />
				</a>

				{/* Desktop nav */}
				<nav class="hidden md:flex flex-1 justify-center space-x-6 font-semibold text-md text-neutral-dark">
					<Link href="/" class="hover:text-primary-500 py-5 px-4">
						Home
					</Link>
					<div class="relative group">
						<button class="hover:text-primary-500 py-5 px-4">View Collections ▾</button>
						<div class="absolute hidden group-hover:block bg-neutral-light border shadow-md mt-2 z-10">
							{collections.map((collection: { name: string; id: string }) => (
								<Link
									key={collection.id}
									href={`/collections/${collection.id}`}
									class="block px-4 py-2 hover:bg-neutral-accent-light"
								>
									{collection.name}
								</Link>
							))}
						</div>
					</div>
					<Link href="/collections/shop-all" class="hover:text-primary-500 py-5 px-4">
						Shop All
					</Link>
					<Link href="/faq" class="hover:text-primary-500 py-5 px-4">
						FAQ
					</Link>
					<Link href="/track" class="hover:text-primary-500 py-5 px-4">
						Track Your Order
					</Link>
					<Link href="/contact" class="hover:text-primary-500 py-5 px-4">
						Contact Us
					</Link>
				</nav>

				{/* Icons */}
				<div class="flex items-center space-x-5 text-neutral-dark text-lg">
					<a href="#" class="hover:text-primary-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width={2}
							stroke="currentColor"
							class="w-7 h-7"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</a>

					{/* ✅ Updated: User Profile Icon navigates to /user-profile */}
					<Link href="/profile" class="hover:text-primary-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
							class="w-7 h-7"
						>
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12 8.5 10.43 8.5 8.5 10.07 5 12 5zm0 14.5c-2.73 0-5.32-1.39-6.84-3.81C6.67 13.93 9.21 13 12 13s5.33.93 6.84 2.69c-1.52 2.42-4.11 3.81-6.84 3.81z" />
						</svg>
					</Link>

					<div class="relative">
						<button class="hover:text-primary-500" onClick$={toggleCart}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
								class="w-7 h-7"
							>
								<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.7-4.5h7.4c.73 0 1.34-.49 1.52-1.21L22 6.5h-4.3l-2.45-5.26c-.44-.94-1.56-1.3-2.5-.87-.94.44-1.3 1.56-.87 2.5L14.7 6.5H5.2L4.5 3.13c-.15-.65-.75-1.13-1.42-1.13H1.9c-.55 0-1 .45-1 1s.45 1 1 1h.7l1.7 8.5c-.32 1.07-.63 2.13-.7 3.2C2.7 18.23 3.94 19 5 19h12c.55 0 1-.45 1-1s-.45-1-1-1H5c-.17 0-.34-.02-.5-.07-.27-.08-.43-.3-.43-.59l-.02-.12c-.08-.3-.06-.52-.01-.73L4.7 12.5h8.9c1.61 0 2.91-1.39 2.76-3.05l-.04-.2-.5-2.22c-.15-.65-.75-1.13-1.42-1.13H7z" />
							</svg>
						</button>
						<span class="absolute -top-2 -right-2 bg-primary-500 text-neutral-light text-xs rounded-full px-[6px] py-[1px] font-bold">
							1
						</span>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{isMenuOpen.value && (
				<div class="fixed inset-0 bg-neutral-light text-neutral-dark z-50 p-6 flex flex-col">
					<div class="flex justify-between items-center mb-8">
						<span class="text-xl font-bold">Menu</span>
						<button onClick$={() => (isMenuOpen.value = false)} class="text-neutral-dark">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<nav class="space-y-4 text-lg font-semibold">
						<Link
							href="/"
							class="block hover:text-primary-500"
							onClick$={() => (isMenuOpen.value = false)}
						>
							Home
						</Link>
						<a
							href="#"
							class="block hover:text-primary-500"
							onClick$={() => (isMenuOpen.value = false)}
						>
							View Collections
						</a>
						<Link
							href="/collections/shop-all"
							class="block hover:text-primary-500"
							onClick$={() => (isMenuOpen.value = false)}
						>
							Shop All
						</Link>
						<Link
							href="/faq"
							class="block hover:text-primary-500"
							onClick$={() => (isMenuOpen.value = false)}
						>
							FAQ
						</Link>
						<Link
							href="/track"
							class="block hover:text-primary-500"
							onClick$={() => (isMenuOpen.value = false)}
						>
							Track Your Order
						</Link>
						<Link
							href="/contactus"
							class="block hover:text-primary-500"
							onClick$={() => (isMenuOpen.value = false)}
						>
							Contact Us
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
});
