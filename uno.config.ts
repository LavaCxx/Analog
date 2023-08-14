// uno.config.ts
import { defineConfig, presetWebFonts, presetUno,presetTypography  } from 'unocss'
import extractorPug from '@unocss/extractor-pug'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
    extractors:[
        extractorPug(),
    ],
    presets: [
        
        presetUno(),
        presetWebFonts({
            provider: 'google', // default provider
            fonts: {
                'IBM Plex Sans':[
                    {
                        name: 'IBM Plex Sans',
                        weights: ['400', '700'],
                        italic: true,
                    },
                ],
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
        }),
        presetIcons({
            prefix: 'i-',
            collections:{
                tabler:()=>import('@iconify-json/tabler').then((i)=>i.icons as any)
            }
        }),
        presetTypography({
            cssExtend:{
                '*':{
                    color:'var(--main-color)'
                },
                'pre':{
                    'background-color':'var(--blank-color)'
                }
            }
        })
    ],
    theme: {
        colors: {
            'base': 'var(--base-color)',
            'blank': 'var(--blank-color)',
            'primary': 'var(--primary-color)',
            'secondary': 'var(--secondary-color)',
            'accent': 'var(--accent-color)',
            'desc': 'var(--desc-color)',
            'main': 'var(--main-color)',
            'sub': 'var(--sub-color)'
        }
    },
    rules: [
        [
            /^text-(.*)$/,
            ([, c], { theme }) => {
                if (theme.colors[c]) return { color: theme.colors[c] }
            }
        ],
        [
            /^bg-(.*)$/,
            ([, c], { theme }) => {
                if (theme.colors[c]) return { background: theme.colors[c] }
            }
        ],
    ]
})