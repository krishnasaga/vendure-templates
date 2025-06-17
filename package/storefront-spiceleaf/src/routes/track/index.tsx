import { component$ } from '@builder.io/qwik';
import { ShipmentTracker } from '~/components/trackshipment'; // Ensure correct path to your component

export default component$(() => {
	return (
		<main class="flex justify-center items-center min-h-screen bg-gray-100 p-4">
			{/* This route will now ONLY render the ShipmentTracker form */}
			<ShipmentTracker />
		</main>
	);
});
