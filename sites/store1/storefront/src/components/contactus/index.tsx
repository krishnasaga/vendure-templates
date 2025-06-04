import { component$ } from '@builder.io/qwik';

/**
 * ContactForm component displays a contact form and support information.
 * It uses Tailwind CSS for styling and is designed to be responsive.
 */
export const ContactForm = component$(() => {
	return (
		<div class="container flex flex-col md:flex-row bg-white p-4 rounded-lg max-w-4xl mx-auto my-8">
			{/* Get In Touch Section - Form */}
			<div class="flex-1 mb-8 md:mb-0 md:mr-8 p-4 bg-gray-50 rounded-lg">
				<h2 class="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
					Get In Touch
				</h2>
				<form
					onSubmit$={(event) => {
						// Prevent default form submission to handle it with Qwik or an API call
						event.preventDefault();
						// You can add your form submission logic here.
						// For example, fetching form data and sending it to an API.
						console.log('Form submitted!');
						// Example: Access form data
						const formData = new FormData(event.target as HTMLFormElement);
						const name = formData.get('name');
						const email = formData.get('email');
						const message = formData.get('message');
						console.log({ name, email, message });

						// In a real application, you would send this data to a backend.
						// Example:
						// fetch('/api/contact', {
						//   method: 'POST',
						//   body: JSON.stringify({ name, email, message }),
						//   headers: { 'Content-Type': 'application/json' }
						// })
						// .then(response => response.json())
						// .then(data => console.log('Success:', data))
						// .catch(error => console.error('Error:', error));
					}}
				>
					<div class="mb-5">
						<label for="name" class="block text-gray-700 text-sm font-semibold mb-2">
							NAME
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
						/>
					</div>
					<div class="mb-5">
						<label for="email" class="block text-gray-700 text-sm font-semibold mb-2">
							EMAIL*
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							required
							class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 ease-in-out"
						/>
					</div>
					<div class="mb-6">
						<label for="message" class="block text-gray-700 text-sm font-semibold mb-2">
							MESSAGE
						</label>
						<textarea
							id="message"
							name="message"
							rows={5}
							placeholder="Message"
							class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y transition duration-200 ease-in-out"
						></textarea>
					</div>
					<button
						type="submit"
						class="w-full bg-orange-800 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
					>
						SEND MESSAGE
					</button>
				</form>
			</div>

			{/* Support Section - Contact Details */}
			<div class="flex-1 md:ml-8 p-4 bg-gray-50 rounded-lg">
				<h2 class="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
					Support
				</h2>

				{/* Phone */}
				<div class="flex items-center mb-6">
					{/* Phone Icon (SVG) */}
					<span class="mr-4 text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
							/>
						</svg>
					</span>
					<div>
						<h3 class="text-lg font-semibold text-gray-700">Phone</h3>
						<a href="tel:+918977021193" class="text-orange-600 font-medium text-xl hover:underline">
							+91 99999 99999
						</a>
					</div>
				</div>

				{/* Email */}
				<div class="flex items-center mb-6">
					{/* Email Icon (SVG) */}
					<span class="mr-4 text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</span>
					<div>
						<h3 class="text-lg font-semibold text-gray-700">email</h3>
						<a
							href="mailto:abc@gmail.com"
							class="text-orange-600 font-medium text-xl hover:underline"
						>
							abc@gmail.com
						</a>
					</div>
				</div>

				{/* Address */}
				<div class="flex items-start">
					{/* Address Icon (SVG) */}
					<span class="mr-4 text-gray-600 mt-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-7 w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</span>
					<div>
						<h3 class="text-lg font-semibold text-gray-700">Address</h3>
						<p class="text-gray-600 text-xl">test</p>
					</div>
				</div>
			</div>
		</div>
	);
});
