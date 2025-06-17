import { component$ } from '@qwik.dev/core';

export const Input = component$((props: any) => {
	return (
		<input
			{...(props as unknown as any)}
			class={`text-md appearance-none block w-full p-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${props.class}`}
		/>
	);
});
