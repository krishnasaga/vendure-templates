import { QRL, component$ } from '@qwik.dev/core';
import { useNavigate } from '@qwik.dev/router';
import { ShippingAddress } from '~/types';
import { Button } from '../buttons/Button';
import { HighlightedButton } from '../buttons/HighlightedButton';
import PencilIcon from '../icons/PencilIcon';
import XCircleIcon from '../icons/XCircleIcon';

type IProps = {
	address: ShippingAddress;
	onDelete$?: QRL<(id: string) => void>;
};

export default component$<IProps>(({ address, onDelete$ }) => {
	const navigate = useNavigate();

	return (
		<div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-4">
			<div class="py-4 px-6">
				<h1 class="text-2xl font-semibold text-primary">
					{address.fullName}{' '}
					{address.company && <span class="py-2 text-lg text-secondary"> - {address.company}</span>}
				</h1>
				<p class="py-2 text-lg text-secondary">{address.streetLine1}</p>
				<p class="text-lg text-secondary">{address.streetLine2}&nbsp;</p>
				<div class="flex items-center mt-4 text-secondary">
					<svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
						<path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
					</svg>
					<h1 class="px-2 text-sm">
						{address.city}, {address.province}
					</h1>
				</div>
				<div class="flex items-center mt-4 mb-4 text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
						/>
					</svg>
					<h1 class="px-2 text-sm">{address.phoneNumber}</h1>
				</div>
				<div class="flex justify-around">
					<HighlightedButton
						onClick$={() => {
							navigate(`/account/address-book/${address.id}`);
						}}
					>
						<PencilIcon /> &nbsp; Edit
					</HighlightedButton>
					<Button
						onClick$={() => {
							if (onDelete$ && address.id) {
								onDelete$(address.id);
							}
						}}
					>
						<XCircleIcon /> &nbsp; Delete
					</Button>
				</div>
				<div class="flex text-xs justify-between mt-4">
					{address.defaultShippingAddress && (
						<div class="flex items-center text-accent">
							<svg
								enable-background="new 0 0 48 48"
								height="24px"
								id="Layer_4"
								version="1.1"
								viewBox="0 0 48 48"
								width="24px"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<g>
									<path
										d="M29.145,12.737v3.097v1.648v2.498h0.898h3.547c1.014,0,2.059,0,2.846,0   C36.137,11.788,29.145,12.737,29.145,12.737z"
										fill="currentColor"
									/>
									<path
										d="M42.996,19c0-10.494-8.507-19-19-19c-10.494,0-19,8.506-19,19C4.996,19.029,5,19.059,5,19.088   c-0.008,0.213-0.017,0.841,0.092,1.827c0.003,0.034,0.009,0.068,0.013,0.103c0.047,0.404,0.116,0.865,0.21,1.376   c0.053,0.291,0.111,0.579,0.177,0.864c1.188,5.314,5.187,14.91,18.5,24.732c0.001,0.004,0.002,0.006,0.003,0.01   c0.001-0.002,0.003-0.002,0.005-0.004c0.001,0.002,0.003,0.002,0.004,0.004c0.001-0.004,0.002-0.006,0.003-0.01   c13.494-9.957,17.418-19.678,18.546-24.945c0.028-0.133,0.058-0.266,0.083-0.4C43.088,20.351,42.996,19,42.996,19z"
										fill="currentColor"
									/>
								</g>
							</svg>
							<span class="ml-2">Shipping Address</span>
						</div>
					)}
					{address.defaultBillingAddress && (
						<div class="flex items-center text-accent">
							<svg
								enable-background="new 0 0 48 48"
								height="24px"
								id="Layer_4"
								version="1.1"
								viewBox="0 0 48 48"
								width="24px"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
							>
								<path
									d="M42.996,19c0-10.494-8.507-19-19-19c-10.494,0-19,8.506-19,19C4.996,19.029,5,19.059,5,19.088  c-0.008,0.213-0.017,0.841,0.092,1.827c0.003,0.034,0.009,0.068,0.013,0.103c0.047,0.404,0.116,0.865,0.21,1.376  c0.053,0.291,0.111,0.579,0.177,0.864c1.188,5.314,5.187,14.91,18.5,24.732c0.001,0.004,0.002,0.006,0.003,0.01  c0.001-0.002,0.003-0.002,0.005-0.004c0.001,0.002,0.003,0.002,0.004,0.004c0.001-0.004,0.002-0.006,0.003-0.01  c13.494-9.957,17.418-19.678,18.546-24.945c0.028-0.133,0.058-0.266,0.083-0.4C43.088,20.351,42.996,19,42.996,19z M25.371,28.115  v3.105h-2.985v-2.893c-2.041-0.09-4.021-0.641-5.179-1.311l0.915-3.563c1.279,0.699,3.076,1.339,5.056,1.339  c1.739,0,2.926-0.67,2.926-1.888c0-1.158-0.976-1.889-3.229-2.65c-3.262-1.097-5.483-2.619-5.483-5.574  c0-2.682,1.886-4.783,5.146-5.423V6.365h2.985v2.679c2.043,0.093,3.415,0.52,4.417,1.006l-0.884,3.442  c-0.789-0.336-2.188-1.037-4.384-1.037c-1.982,0-2.623,0.854-2.623,1.707c0,1.004,1.067,1.646,3.657,2.62  c3.626,1.28,5.087,2.955,5.087,5.698C30.793,25.191,28.875,27.504,25.371,28.115z"
									fill="currentColor"
								/>
							</svg>
							<span class="ml-2">Billing Address</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});
