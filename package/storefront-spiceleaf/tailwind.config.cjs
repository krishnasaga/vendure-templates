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
				'slide-up-fade': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(1)' },
					'100%': { opacity: '1', transform: 'scale(0.5)' },
				},
			},
			animation: {
				'slide-up-fade': 'slide-up-fade 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.8s ease-out forwards',
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
