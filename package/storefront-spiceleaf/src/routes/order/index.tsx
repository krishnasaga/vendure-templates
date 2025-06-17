import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { OrderProgress, OrderStatus } from '~/components/orderprogress'; // Ensure correct path to your component

// Define the type for the order data that will be fetched by the loader
export interface OrderData {
	orderId: string;
	expectedArrival: string;
	trackingNumber: string;
	currentStatusIndex: OrderStatus;
}

// This routeLoader$ runs on the server (or during client-side navigation)
// to fetch data based on the URL query parameters.
export const useOrderDataLoader = routeLoader$(async ({ url }) => {
	// Get the 'orderId' query parameter from the URL (e.g., from /track?orderId=12345)
	const orderId = url.searchParams.get('orderId');

	if (orderId) {
		// --- IMPORTANT: REPLACE THIS BLOCK WITH YOUR ACTUAL API CALL ---
		// This is where you would make a real API request to your backend
		// to retrieve the actual shipment details for the given orderId.
		//
		// Example:
		// try {
		//   const response = await fetch(`YOUR_BACKEND_API_URL/track-order?id=${orderId}`);
		//   if (!response.ok) {
		//     console.error("Failed to fetch order data:", response.statusText);
		//     return null; // Or return an error object
		//   }
		//   const realOrderData = await response.json();
		//   // Map your API response structure to the OrderData interface
		//   return {
		//     orderId: realOrderData.id,
		//     expectedArrival: realOrderData.eta,
		//     trackingNumber: realOrderData.trackingCode,
		//     currentStatusIndex: mapApiStatusToOrderStatusEnum(realOrderData.status),
		//   } as OrderData;
		// } catch (error) {
		//   console.error("Error fetching order:", error);
		//   return null; // Return null on error
		// }

		// --- MOCK DATA FOR DEMONSTRATION PURPOSES ONLY ---
		// This simulates fetching different statuses based on input.
		let simulatedStatus: OrderStatus;
		if (orderId.includes('6152')) {
			simulatedStatus = OrderStatus.OrderShipped; // Matches your image
		} else if (orderId.includes('1234')) {
			simulatedStatus = OrderStatus.OrderProcessed;
		} else if (orderId.includes('5678')) {
			simulatedStatus = OrderStatus.OrderEnRoute;
		} else {
			simulatedStatus = OrderStatus.OrderProcessed; // Default or error state
		}

		// Simulate a small network delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			orderId: orderId.toUpperCase(),
			expectedArrival: '01/06/2025', // Static for demo, replace with real data
			trackingNumber: 'V534HB', // Static for demo, replace with real data
			currentStatusIndex: simulatedStatus,
		} as OrderData;
	}

	return null; // If no orderId is present in the URL, return null (no data to show)
});

// The default component for the /track route
export default component$(() => {
	const orderData = useOrderDataLoader(); // Access the data fetched by the routeLoader

	// Check if orderData.value (the fetched data) is available
	if (!orderData.value) {
		// If no orderId was in the URL, or if fetching failed, show a message
		return (
			<div class="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto my-10 text-center">
				<h2 class="text-xl font-semibold text-gray-800 mb-4">No Order Details Found</h2>
				<p class="text-gray-600 mb-4">Please enter a valid Order ID to track your shipment.</p>
				{/* Option to navigate back to the main tracking form */}
				<a
					href="/"
					class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
				>
					Go to Tracking Form
				</a>
			</div>
		);
	}

	// If orderData.value exists, render the OrderProgress component with the data
	return (
		<main class="flex justify-center items-center min-h-screen bg-gray-100 p-4">
			<OrderProgress
				orderId={orderData.value.orderId}
				expectedArrival={orderData.value.expectedArrival}
				trackingNumber={orderData.value.trackingNumber}
				currentStatusIndex={orderData.value.currentStatusIndex}
			/>
		</main>
	);
});
