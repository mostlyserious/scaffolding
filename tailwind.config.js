const glob = require('tiny-glob/sync');
const plugin = require('tailwindcss/plugin');
const inset = require('brightpack/tailwindcss/inset');
const clamp = require('brightpack/tailwindcss/clamp');
const viewport = require('brightpack/tailwindcss/viewport');
const xallarap = require('brightpack/tailwindcss/xallarap');
const isActive = require('brightpack/tailwindcss/is-active');
const textStroke = require('brightpack/tailwindcss/text-stroke');

module.exports = {
    content: [
        glob('src/js/**/*.{js,svelte}'),
        glob('public/**/*.{html,php}'),
        'safelist.txt'
    ].flat(),
    theme: {
        extend: {
            colors: {
                brand: {

                }
            },
            fontFamily: {

            },
            fontSize: {
                '9xl': [ '8rem', '1.0' ],
                '8xl': [ '6rem', '1.0' ],
                '7xl': [ '4.5rem', '1.0' ],
                '6xl': [ '3.75rem', '1.0' ],
                '5xl': [ '3rem', '1.0' ],
                '4xl': [ '2.25rem', '1.111' ],
                '3xl': [ '1.875rem', '1.2' ],
                '2xl': [ '1.5rem', '1.333' ],
                'xl': [ '1.25rem', '1.4' ],
                'lg': [ '1.125rem', '1.5' ],
                'base': [ '1rem', '1.5' ],
                'md': [ '1rem', '1.5' ],
                'sm': [ '0.875rem', '1.5' ],
                'xs': [ '0.75rem', '1.5' ],
                '2xs': [ '0.66rem', '1.666' ]
            },
            width: {
                'min-content': 'min-content',
                'max-content': 'max-content'
            },
            minHeight: theme => theme('height'),
            maxHeight: theme => theme('height'),
            minWidth: theme => ({ ...theme('width'), '8xl': '88rem', '9xl': '92rem' }),
            maxWidth: theme => ({ ...theme('width'), '8xl': '88rem', '9xl': '92rem' }),
            borderWidth: {
                '0.5': '0.5px',
                '1': '1px',
                '3': '3px'
            },
            transitionDelay: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms'
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms'
            },
            zIndex: {
                '1': 1,
                '2': 2,
                '3': 3
            }
        }
    },
    plugins: [
        clamp,
        inset,
        xallarap,
        isActive,
        viewport,
        textStroke,
        plugin(({ matchUtilities, addComponents, addUtilities, addVariant, theme }) => {
            addUtilities({
                '.appearance-none': {
                    '-webkit-appearance': 'none',
                    '-moz-appearance': 'none'
                },
                '.has-active': {
                    '@apply opacity-0 pointer-events-none': false,
                    '@apply is-active:opacity-100 is-active:pointer-events-auto': false
                }
            });

            addComponents({
                '.container': {
                    '@apply max-w-6xl w-full px-6 mx-auto': false
                },
                '.container-sm': {
                    '@apply max-w-5xl': false
                },
                '.container-lg': {
                    '@apply max-w-7xl': false
                },
                '.container-offset-right': {
                    'margin-right': `max(0px, calc(calc(100vw - ${theme('maxWidth.6xl')}) / 2))`,
                    '@apply pr-6': false
                },
                '.container-offset-left': {
                    'margin-left': `max(0px, calc(calc(100vw - ${theme('maxWidth.6xl')}) / 2))`,
                    '@apply pl-6': false
                },
                '.container-sm-offset-right': {
                    'margin-right': `max(0px, calc(calc(100vw - ${theme('maxWidth.5xl')}) / 2))`,
                    '@apply pr-6': false
                },
                '.container-sm-offset-left': {
                    'margin-left': `max(0px, calc(calc(100vw - ${theme('maxWidth.5xl')}) / 2))`,
                    '@apply pl-6': false
                },
                '.container-lg-offset-right': {
                    'margin-right': `max(0px, calc(calc(100vw - ${theme('maxWidth.7xl')}) / 2))`,
                    '@apply pr-6': false
                },
                '.container-lg-offset-left': {
                    'margin-left': `max(0px, calc(calc(100vw - ${theme('maxWidth.7xl')}) / 2))`,
                    '@apply pl-6': false
                }
            });

            addVariant('expanded', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => [
                    `[aria-expanded="true"] .${e(`expanded${separator}${className}`)},`,
                    `.${e(`expanded${separator}${className}`)}[aria-expanded="true"]`
                ].join('\n'));
            });
        })
    ],
    corePlugins: {
        container: false
    }
};
