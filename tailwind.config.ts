import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        colori: "#CCCCCC",
         primary: '#DB3E36'
      },
      fontFamily: {
        product: ["var(--font-Montserrat)"],
      },
      fontWeight: {
        thin: '100',
        extraLight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
        extraBold: '800',
        black: '900',
      },
      backgroundImage: {
        customeLinear: "linear-gradient(123.5deg, #C7FA74 31.37%, #2AE726 99.91%);",
        bgHero: "url('/assets/Frame.svg')",
        bg1: "url('/assets/Container 32(1).svg')",
        bg2: "url('/assets/Container 32.svg')",
        customeLineari: " linear-gradient(180deg, #C7FA74 45.68%, #2AE726 156.24%);",
        customGradient: "linear-gradient(123.5deg, #C7FA74 31.37%, #2AE726 99.91%);",
        bgCol: "var(--Base-Base-Black, #101720)",
        bgFooter: "linear-gradient(99.68deg, #2AE726 2.68%, rgba(199, 250, 116, 0.9) 75.77%)",
        bgBilling: "linear-gradient(180deg, #C7FA74 45.68%, #2AE726 156.24%)",
        howLinear: "linear-gradient(215.16deg, rgba(0, 0, 0, 0) -18.07%, #0A0B0A 44.42%)",
        bgHeroi: "url('/assets/hero pattern.svg')",
        bgHero2: "url('/assets/Frame.svg')",
        customLinear1: "linear-gradient(199.33deg, #2AE726 12.99%, #3E6204 84.79%);",
        Ellipse: "url(/assets/Ellipse.svg)"
      },
      backdropBlur: {
        'extreme': '300px',
      },
      boxShadow: {
        'shadowl': '0px 141px 200px -80px #193A4B4D'
      }
      
    },
   },
  plugins: [],
};
export default config;
