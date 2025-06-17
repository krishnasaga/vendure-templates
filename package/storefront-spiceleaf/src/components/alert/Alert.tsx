import { component$ } from '@qwik.dev/core';
import XCircleIcon from '../icons/XCircleIcon';

export default component$<{ message: string }>(({ message }) => {
	return (
		<div class="rounded-md bg-error/10 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<XCircleIcon />
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-error">{message}</h3>
				</div>
			</div>
		</div>
	);
});
