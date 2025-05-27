import { $, component$, QRL } from '@qwik.dev/core';
import FilterIcon from '../icons/FilterIcon';

export default component$<{ onToggleMenu$: QRL<() => void> }>(({ onToggleMenu$ }) => {
	return (
		<button
			type="button"
			class="flex space-x-2 items-center border border-muted rounded p-2 ml-4 sm:ml-6 text-secondary hover:text-primary lg:hidden"
			onClick$={$(async () => {
				onToggleMenu$();
			})}
		>
			<span class="text-primary">Filters</span>
			<FilterIcon />
		</button>
	);
});
