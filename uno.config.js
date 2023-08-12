import {defineConfig} from 'unocss';
import presetWind from "@unocss/preset-wind";
import presetWebFonts from '@unocss/preset-web-fonts'
export default defineConfig({
    
    presets:[presetWind(),presetWebFonts({
        provider: 'google', // default provider
        fonts: {
          // these will extend the default theme
          sans: 'Roboto',
          mono: ['Fira Code', 'Fira Mono:400,700'],
          // custom ones
          lobster: 'Lobster',
          lato: [
            {
              name: 'Lato',
              weights: ['400', '700'],
              italic: true,
            },
            {
              name: 'sans-serif',
              provider: 'none',
            },
          ],
        },
      })],
    theme:{
        colors:{
            'blank':'var(--blank-color)',
            'primary':'var(--primary-color)',
            'secondary':'var(--secondary-color)',
            'accent':'var(--accent-color)',
            'desc':'var(--desc-color)',
            'main':'var(--text-color)',
            'adorn':'var(--adorn-color)',
            'notice':'var(--notice-color)',
        }
    },
    rules:[
        [
            /^text-(.*)$/,
            ([,c],{theme})=>{
                if(theme.colors[c]) return {color:theme.colors[c]}
            }
        ],
        [
            /^bg-(.*)$/,
            ([,c],{theme})=>{
                if(theme.colors[c]) return {background:theme.colors[c]}
            }
        ],
    ]

})