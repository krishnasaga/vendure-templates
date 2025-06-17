import { component$ } from '@builder.io/qwik';

// Enum to represent the order statuses
export enum OrderStatus {
	OrderProcessed = 0,
	OrderDesigning = 1,
	OrderShipped = 2,
	OrderEnRoute = 3,
	OrderArrived = 4,
}

// Define the props interface for the OrderProgress component
interface OrderProgressProps {
	orderId: string;
	expectedArrival: string;
	trackingNumber: string;
	currentStatusIndex: OrderStatus; // Use the enum here
}

export const OrderProgress = component$<OrderProgressProps>((props) => {
	const statuses = [
		{
			name: 'Order Processed',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.234 7.178 3.976 3.976a4.5 4.5 0 0 1-6.364 0L10.5 14.25m7.5-6v-.75m-3 0v-.75m-3 0v-.75m-9 8.25h10.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H3.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75ZM6 18H4.5M6 21H4.5"
					/>
				</svg>
			),
		},
		{
			name: 'Order Designing',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15.75c0 .414-.336.75-.75.75H3.75a.75.75 0 0 1-.75-.75V4.5A2.25 2.25 0 0 1 5.25 2.25h13.5A2.25 2.25 0 0 1 21 4.5ZM12.75 6a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V6Z"
					/>
				</svg>
			),
		},
		{
			name: 'Order Shipped',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 18.75a1.5 1.5 0 0 1 1.5-1.5h6.75a1.5 1.5 0 0 1 1.5 1.5V21h3v-3.75a1.5 1.5 0 0 0-1.5-1.5H19.5a1.5 1.5 0 0 1-1.5-1.5v-.75A.75.75 0 0 0 17.25 12h-1.5a.75.75 0 0 0-.75.75v.75a1.5 1.5 0 0 1-1.5 1.5H9.75a1.5 1.5 0 0 1-1.5-1.5V12h-1.5V6a.75.75 0 0 0-.75-.75H3.75a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 .75.75H6a.75.75 0 0 1 .75.75v3.75a1.5 1.5 0 0 0 1.5 1.5ZM12 6v3"
					/>
				</svg>
			),
		},
		{
			name: 'Order En Route',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8.25 18.75a1.5 1.5 0 0 1 1.5-1.5h6.75a1.5 1.5 0 0 1 1.5 1.5V21h3v-3.75a1.5 1.5 0 0 0-1.5-1.5H19.5a1.5 1.5 0 0 1-1.5-1.5v-.75A.75.75 0 0 0 17.25 12h-1.5a.75.75 0 0 0-.75.75v.75a1.5 1.5 0 0 1-1.5 1.5H9.75a1.5 1.5 0 0 1-1.5-1.5V12h-1.5V6a.75.75 0 0 0-.75-.75H3.75a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 .75.75H6a.75.75 0 0 1 .75.75v3.75a1.5 1.5 0 0 0 1.5 1.5ZM12 6v3"
					/>
				</svg>
			),
		},
		{
			name: 'Order Arrived',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m2.25 12 8.954-8.955c.44-.439 1.135-.439 1.575 0L21.75 12m-4.5 9V15.75c0-.621-.504-1.125-1.125-1.125H15.75c-.621 0-1.125.504-1.125 1.125V21m-4.5 0V15.75c0-.621-.504-1.125-1.125-1.125H9.75c-.621 0-1.125.504-1.125 1.125V21M21 12.75V11.25a.75.75 0 0 0-.75-.75H3.75a.75.75 0 0 0-.75.75v1.5M12 1.5a.75.75 0 0 0-.75.75V3"
					/>
				</svg>
			),
		},
	];

	return (
		<div class="p-4 bg-white rounded-lg">
			{/* Header section */}
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-semibold text-gray-800">
					ORDER #<span class="text-blue-600">{props.orderId}</span>
				</h2>
				<div class="text-right text-gray-600 text-sm">
					<p>Expected Arrival {props.expectedArrival}</p>
					<p>
						Grasshoppers <span class="text-blue-600">{props.trackingNumber}</span>
					</p>
				</div>
			</div>

			{/* Progress Bar */}
			<div class="flex items-center justify-between relative mb-8">
				<div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200">
					{/* Progress fill */}
					<div
						class="h-full bg-purple-600 transition-all duration-500 ease-in-out"
						style={{ width: `${(props.currentStatusIndex / (statuses.length - 1)) * 100}%` }}
					></div>
				</div>

				{statuses.map((status, index) => (
					<div key={index} class="relative z-10 flex flex-col items-center">
						<div
							class={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${index <= props.currentStatusIndex ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300'}`}
						>
							{/* This is a placeholder for a checkmark or specific icon for current/completed */}
							{index <= props.currentStatusIndex && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="3"
									stroke="currentColor"
									class="w-5 h-5 text-white"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
								</svg>
							)}
						</div>
					</div>
				))}
			</div>

			{/* Status Icons and Text */}
			<div class="grid grid-cols-5 gap-4 text-center mt-4">
				{statuses.map((status, index) => (
					<div key={index} class="flex flex-col items-center">
						<div
							class={`w-12 h-12 flex items-center justify-center rounded-full mb-2
                ${index <= props.currentStatusIndex ? 'text-purple-600' : 'text-gray-400'}`}
						>
							{status.icon}
						</div>
						<p
							class={`text-sm ${
								index === props.currentStatusIndex ? 'font-semibold text-gray-900' : 'text-gray-600'
							}`}
						>
							{status.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
});
