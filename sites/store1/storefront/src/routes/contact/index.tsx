import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ContactForm } from '~/components/contactus';

export default component$(() => {
	return (
		<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
			{/* The ContactForm component will be rendered here */}
			<ContactForm />
		</div>
	);
});

/**
 * Defines the document head for the Contact Us page.
 * This includes the title and description for SEO purposes.
 */
export const head: DocumentHead = {
	title: 'Contact Us - Vaaradhi Farms',
	meta: [
		{
			name: 'description',
			content: 'Get in touch with Vaaradhi Farms for inquiries and support.',
		},
	],
};
