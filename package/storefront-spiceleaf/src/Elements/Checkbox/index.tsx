import { component$ } from '@qwik.dev/core';

export const Checkbox = component$((props: any) => {
	return (
		<div class="flex items-center">
			<input
				{...props}
				class="h-5 w-5 cursor-pointer text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
			/>
			<label for={props?.id} class="cursor-pointer ml-2 block text-sm text-neutral-dark">
				{props?.label}
			</label>
		</div>
	);
});
