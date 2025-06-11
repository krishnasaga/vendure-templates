import { component$, $, useContext } from '@qwik.dev/core';
import { APP_STATE } from '~/constants';
import { Checkbox } from '~/Elements/Checkbox';
import { TextInput } from '~/Elements/TextInput';
import { ShippingAddress } from '~/types';

type IProps = {
	shippingAddress: ShippingAddress;
};
export default component$<IProps>(({ shippingAddress }) => {
	const appState = useContext(APP_STATE);
	return (
		<div>
			{shippingAddress.countryCode && (
				<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.phoneNumber}
						label={$localize`Phone`}
						name="phoneNumber"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								phoneNumber: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.fullName}
						label={$localize`Full name`}
						name="fullName"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								fullName: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2 hidden"
						value={shippingAddress.company}
						label={$localize`Company`}
						name="company"
						onChange$={(_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								company: el.value,
							};
						}}
					/>
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.streetLine1}
						label={$localize`Address`}
						name="streetLine1"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								streetLine1: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.streetLine2}
						label={$localize`Apartment, suite, etc.`}
						name="streetLine2"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								streetLine2: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.city}
						label={$localize`City`}
						name="city"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								city: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2 hidden"
						value={shippingAddress.countryCode}
						label={$localize`Country`}
						name="countryCode"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								countryCode: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.province}
						label={$localize`State`}
						name="province"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								province: el.value,
							};
						})}
					/>
					<TextInput
						class="sm:col-span-2"
						value={shippingAddress.postalCode}
						label={$localize`PIN CODE`}
						name="postalCode"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								postalCode: el.value,
							};
						})}
					/>
					<Checkbox
						value={shippingAddress.defaultShippingAddress}
						label={$localize`Default Shipping Address`}
						name="defaultShippingAddress"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								defaultShippingAddress: el.checked,
							};
						})}
					/>
					<Checkbox
						value={shippingAddress.defaultBillingAddress}
						label={$localize`Default Billing Address`}
						name="defaultBillingAddress"
						onChange$={$((_: any, el: any) => {
							appState.shippingAddress = {
								...appState.shippingAddress,
								defaultBillingAddress: el.checked,
							};
						})}
					/>
				</div>
			)}
		</div>
	);
});
