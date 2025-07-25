import { $, component$, QRL, Slot } from '@qwik.dev/core';

type Props = {
	extraClass?: string;
	onClick$?: QRL<() => void>;
};

export const Button = component$<Props>(({ extraClass = '', onClick$ }) => {
	return (
		<button
			type="button"
			class={`flex items-center justify-around bg-muted border rounded-md py-2 px-4 text-base font-medium text-primary hover:bg-muted/70 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary ${extraClass}`}
			onClick$={$(async () => {
				onClick$ && onClick$();
			})}
		>
			<Slot />
		</button>
	);
});
