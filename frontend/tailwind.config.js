// /** @type {import('tailwindcss').Config} */
// // export default {
// //   content: ["./index.html",
// //     "./src/**/*.{js,html}",
// // ],
// module.exports = {
//     darkMode: ["class"],
//     content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//   	extend: {
//   		animation: {
//   			ringA: 'ringA 2s linear infinite',
//   			ringB: 'ringB 2s linear infinite',
//   			ringC: 'ringC 2s linear infinite',
//   			ringD: 'ringD 2s linear infinite'
//   		},
//   		keyframes: {
//   			ringA: {
//   				'0%, 4%': {
//   					'stroke-dasharray': '0 660',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-330'
//   				},
//   				'12%': {
//   					'stroke-dasharray': '60 600',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-335'
//   				},
//   				'32%': {
//   					'stroke-dasharray': '60 600',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-595'
//   				},
//   				'40%, 54%': {
//   					'stroke-dasharray': '0 660',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-660'
//   				},
//   				'62%': {
//   					'stroke-dasharray': '60 600',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-665'
//   				},
//   				'82%': {
//   					'stroke-dasharray': '60 600',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-925'
//   				},
//   				'90%, 100%': {
//   					'stroke-dasharray': '0 660',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-990'
//   				}
//   			},
//   			ringB: {
//   				'0%, 12%': {
//   					'stroke-dasharray': '0 220',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-110'
//   				},
//   				'20%': {
//   					'stroke-dasharray': '20 200',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-115'
//   				},
//   				'40%': {
//   					'stroke-dasharray': '20 200',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-195'
//   				},
//   				'48%, 62%': {
//   					'stroke-dasharray': '0 220',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-220'
//   				},
//   				'70%': {
//   					'stroke-dasharray': '20 200',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-225'
//   				},
//   				'90%': {
//   					'stroke-dasharray': '20 200',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-305'
//   				},
//   				'98%, 100%': {
//   					'stroke-dasharray': '0 220',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-330'
//   				}
//   			},
//   			ringC: {
//   				'0%': {
//   					'stroke-dasharray': '0 440',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '0'
//   				},
//   				'8%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-5'
//   				},
//   				'28%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-175'
//   				},
//   				'36%, 58%': {
//   					'stroke-dasharray': '0 440',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-220'
//   				},
//   				'66%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-225'
//   				},
//   				'86%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-395'
//   				},
//   				'94%, 100%': {
//   					'stroke-dasharray': '0 440',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-440'
//   				}
//   			},
//   			ringD: {
//   				'0%, 8%': {
//   					'stroke-dasharray': '0 440',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '0'
//   				},
//   				'16%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-5'
//   				},
//   				'36%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-175'
//   				},
//   				'44%, 50%': {
//   					'stroke-dasharray': '0 440',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-220'
//   				},
//   				'58%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-225'
//   				},
//   				'78%': {
//   					'stroke-dasharray': '40 400',
//   					'stroke-width': '30',
//   					'stroke-dashoffset': '-395'
//   				},
//   				'86%, 100%': {
//   					'stroke-dasharray': '0 440',
//   					'stroke-width': '20',
//   					'stroke-dashoffset': '-440'
//   				}
//   			}
//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		},
//   		colors: {
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		}
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
// };
 


/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{js,jsx}',
	  './components/**/*.{js,jsx}',
	  './app/**/*.{js,jsx}',
	  './src/**/*.{js,jsx}',
	],
	prefix: "",
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		colors: {
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }