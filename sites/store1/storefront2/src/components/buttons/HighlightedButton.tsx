import { $, component$, QRL, Slot } from '@qwik.dev/core';

type Props = {
	extraClass?: string;
	onClick$?: QRL<() => void>;
};

export const HighlightedButton = component$<Props>(({ extraClass = '', onClick$ }) => {
	return (
		<button
			type="button"
			class={`flex items-center justify-around bg-primary border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary ${extraClass}`}
			onClick$={$(async () => {
				onClick$ && onClick$();
			})}
		>
			<Slot />
		</button>
	);
});
