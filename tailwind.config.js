/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f5f3ff',
  				'100': '#ede9fe',
  				'200': '#ddd6fe',
  				'300': '#c4b5fd',
  				'400': '#a78bfa',
  				'500': '#A020F0',
  				'600': '#8C1ACF',
  				'700': '#7c3aed',
  				'800': '#6b21a8',
  				'900': '#581c87',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				violet: '#A020F0',
  				magenta: '#E000B0',
  				'violet-dark': '#8C1ACF',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			gray: {
  				'50': '#F9FAFB',
  				'100': '#F3F4F6',
  				'200': '#E5E7EB',
  				'300': '#D1D5DB',
  				'400': '#9CA3AF',
  				'500': '#6B7280',
  				'600': '#4B5563',
  				'700': '#374151',
  				'800': '#1F2937',
  				'900': '#111827',
  				'950': '#0A0A0A'
  			},
  			white: '#ffffff',
  			black: '#000000',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-display)',
  				'serif'
  			]
  		},
				backgroundImage: {
					'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
					'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
					'hero-pattern': "url('/images/hero-pattern.svg')"
				},
  		animation: {
  			'fade-in': 'fade-in 0.5s ease-out',
  			'fade-in-up': 'fade-in-up 0.6s ease-out',
  			'slide-in-right': 'slide-in-right 0.5s ease-out',
  			'zoom-in': 'zoom-in 0.5s ease-out'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					transform: 'translateX(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'zoom-in': {
  				'0%': {
  					transform: 'scale(0.8)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			}
  		},
  		screens: {
  			xs: '475px',
  			'3xl': '1920px'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  // Entferne darkMode: 'class', da wir es nicht mehr umschalten wollen.
  // Die Farben werden direkt über die Klassen angesprochen.
}

module.exports = config