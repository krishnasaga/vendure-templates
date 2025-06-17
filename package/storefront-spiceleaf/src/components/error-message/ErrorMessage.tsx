import XCircleIcon from '../icons/XCircleIcon';

export const ErrorMessage = ({ heading, message }: { heading: string; message: string }) => {
	return (
		<div class="rounded-md bg-error/10 p-4 max-w-lg">
			<div class="flex">
				<div class="flex-shrink-0">
					<XCircleIcon forcedClass="h-5 w-5 text-error" aria-hidden="true" />
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-error">{heading}</h3>
					<p class="text-sm text-error mt-2">{message}</p>
				</div>
			</div>
		</div>
	);
};
