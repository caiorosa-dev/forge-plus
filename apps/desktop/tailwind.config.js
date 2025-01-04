/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        fadeInTransform: 'fadeInTransform 0.3s ease-out',
        fadeInBottom: 'fadeInBottom 0.3s ease-out',
        fadeOut: 'fadeOut 0.3s ease-in forwards',
        slideDownAndFade: 'slideDownAndFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFadeOut:
          'slideDownAndFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFadeOut:
          'slideUpAndFadeOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        menu: '0px 11px 20px 0px rgba(0, 0, 0, 0.10)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInTransform: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        fadeInBottom: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideDownAndFadeOut: {
          to: { opacity: 0, transform: 'translateY(-2px)' },
          from: { opacity: 1, transform: 'translateY(0)' },
        },
        slideUpAndFadeOut: {
          to: { opacity: 0, transform: 'translateY(2px)' },
          from: { opacity: 1, transform: 'translateY(0)' },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentHide: {
          to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate'), require('tailwindcss-animated')],
};
