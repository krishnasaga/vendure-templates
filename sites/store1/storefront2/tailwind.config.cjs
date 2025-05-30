const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: colors.orange,
				secondary: colors.amber,
				tertiary: colors.purple,
				neutral: colors.amber,
				'neutral-light': colors.gray['100'],
				'neutral-dark': colors.amber['800'],
				'neutral-darker': colors.amber['900'],
				'neutral-darkest': colors.amber['950'],
				'neutral-accent': colors.gray['600'],
				'neutral-accent-light': colors.gray['200'],
				'neutral-accent-dark': colors.gray['700'],
				'neutral-accent-darker': colors.gray['800'],

				// Optional semantic colors
				success: colors.green,
				error: colors.red,
				info: colors.blue,
				warning: colors.yellow,
				muted: colors.gray,
			},
			keyframes: {
				slideFade: {
					'0%': { transform: 'translateY(40%) ', opacity: '0', zIndex: '0' },
					'15%': { transform: 'translateY(20%) ', opacity: '0.8', zIndex: '5' },
					'35%': { transform: 'translateY(0%) ', opacity: '1', zIndex: '10' },
					'50%': { transform: 'translateY(0%) ', opacity: '1', zIndex: '10' },
					'55%': { transform: 'translateY(0%) ', opacity: '1', zIndex: '5' },
					'75%': { transform: 'translateY(-40%) ', opacity: '0.8', zIndex: '0' },
					'100%': { transform: 'translateY(-60%) ', opacity: '0', zIndex: '0' },
				},
			},
			animation: {
				'slide-fade-1': 'slideFade 3s linear infinite 0s',
				'slide-fade-2': 'slideFade 3s linear infinite 2s',
				'slide-fade-3': 'slideFade 3s linear infinite 3s',
				'slide-fade-4': 'slideFade 3s linear infinite 4s',
			},
		},
		container: {
			center: true,
			padding: '1rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px',
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
