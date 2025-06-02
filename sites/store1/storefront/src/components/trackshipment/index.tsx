import { component$, useSignal, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city'; // Import useNavigate for client-side navigation

export const ShipmentTracker = component$(() => {
	const searchType = useSignal<'orderId' | 'awb'>('orderId'); // Keep this for radio button logic
	const searchValue = useSignal(''); // Stores the input value
	const nav = useNavigate(); // Hook to programmatically navigate

	const handleSubmit = $(async (event: Event) => {
		event.preventDefault(); // <<< THIS IS CRUCIAL! It stops the browser from doing a full page reload.

		const idToSearch = searchValue.value.trim();

		if (idToSearch) {
			// Navigate to the '/track' route, passing the orderId as a query parameter.
			// Qwik City will then handle rendering the /track/index.tsx and its routeLoader.
			await nav(`/track?orderId=${idToSearch}`);
		} else {
			alert('Please enter an Order ID or AWB to proceed.');
		}
	});

	return (
		<div class="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto my-10">
			<div class="flex items-center mb-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6 text-gray-700 mr-3"
				>
					<path
						fill-rule="evenodd"
						d="M3 3.75A.75.75 0 0 1 3.75 3h16.5a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V3.75ZM6.983 5.703a.75.75 0 0 0-1.042.26L3 12h18L18.06 5.963a.75.75 0 0 0-1.042-.26L12 9.25l-5.017-3.547ZM4.5 13.5v5.25c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V13.5h-15Z"
						clip-rule="evenodd"
					/>
				</svg>
				<h1 class="text-xl font-semibold text-gray-800">Track / Return your shipment</h1>
			</div>

			<form onSubmit$={handleSubmit}>
				{' '}
				{/* Changed from onSubmit$ to onSubmitQrl */}{' '}
				{/* Qwik's optimized form submission handler */}
				<div class="mb-6">
					<span class="text-gray-700 text-sm font-medium mr-4">Search By:</span>
					<label class="inline-flex items-center mr-6 cursor-pointer">
						<input
							type="radio"
							name="searchType"
							value="orderId"
							checked={searchType.value === 'orderId'}
							onChange$={() => (searchType.value = 'orderId')}
							class="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
						/>
						<span class="ml-2 text-gray-700">Order ID</span>
					</label>
					<label class="inline-flex items-center cursor-pointer">
						<input
							type="radio"
							name="searchType"
							value="awb"
							checked={searchType.value === 'awb'}
							onChange$={() => (searchType.value = 'awb')}
							class="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
						/>
						<span class="ml-2 text-gray-700">AWB</span>
					</label>
				</div>
				<div class="mb-6">
					<input
						type="text"
						value={searchValue.value}
						onInput$={(e) => (searchValue.value = (e.target as HTMLInputElement).value)}
						placeholder={`Enter ${searchType.value === 'orderId' ? 'Order ID' : 'AWB'} to search`}
						class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
					/>
				</div>
				<div>
					<button
						type="submit"
						class="w-full sm:w-auto px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
});
