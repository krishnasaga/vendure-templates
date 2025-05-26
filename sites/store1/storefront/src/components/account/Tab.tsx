import { Component, component$ } from '@qwik.dev/core';

interface IProps {
	Icon: Component<{ class: string }>;
	text: string;
	href: string;
	isActive: boolean;
}

export const Tab = component$(({ Icon, text, href, isActive }: IProps) => {
	return (
		<li>
			<a
				href={href}
				class={`group w-full gap-x-2 max-w-[12rem] inline-flex items-center justify-around p-4 rounded-t-lg border-b-2 ${
					isActive
						? 'text-primary border-primary'
						: 'border-transparent hover:text-muted hover:border-muted'
				}`}
			>
				<Icon
					class={`w-5 h-5 ${
						isActive ? 'text-primary' : 'text-muted group-hover:text-secondary'
					}`}
				/>
				<p class="flex-1">{text}</p>
			</a>
		</li>
	);
});
