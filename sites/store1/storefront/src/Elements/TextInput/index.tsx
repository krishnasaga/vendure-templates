import { component$} from '@qwik.dev/core';

export const TextInput = component$((props: any) => {
	const random = Math.random() * 10;
	const id = props.name + '' + random;
	return (
		<div class={props.class}>
			<label html-for={id} class="block text-sm font-bold text-neutral-dark uppercase">
				{props.label}
			</label>
			<div class="mt-1">
				<input
					type={props.type || 'text'}
					name={props.name}
					id={id}
					value={props.value}
					class="text-md appearance-none block w-full p-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
					onChange$={props.onChange$}
				/>
			</div>
		</div>
	);
});
