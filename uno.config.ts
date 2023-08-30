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
                mdi:()=>import('@iconify-json/mdi').then((i)=>i.icons as any),
                tabler:()=>import('@iconify-json/tabler').then((i)=>i.icons as any)
            }
        },
        
        ),
        presetTypography({
            selectorName:'prose',
            cssExtend:{
                '*':{
                    color:'var(--main-color)',
                    'white-space':'normal',
                },
                '*::marker':{
                    color:'var(--main-color)'
                },
                'code':{
                    'background-color':'var(--desc-color)',
                    // 'margin':'0 0.25rem'
                },
                'input[type=checkbox],input[type=radio]':{
                    // 'background-color':'var(--main-color)'
                    'appearance':'none'
                },
                'a':{
                    'text-decoration':'none'
                },
                'p,ul,ol,pre':{
                    'light-height':'1 !important'
                },
                'strong':{
                    // 'margin':'0 0.2rem'
                },
                'h1,h2,h3,h4,h5':{
                    'position':'relative',
                    'font-weight':'bold'
                },
                'h1 a,h2 a,h3 a,h4 a,h5 a':{
                    'font-weight':'bold'
                },
                'h1:hover::before,h2:hover::before,h3:hover::before,h4:hover::before,h5:hover::before':{
                    'content':"'#'",
                    'position':'absolute',
                    'right':'100%'
                },
                'hr':{
                    'border-color':'var(--sub-color)'
                },
                'code::before':{
                    'visibility':'hidden',
                },
                'code::after':{
                    'visibility':'hidden'
                },
                'pre':{
                    'background-color':'var(--desc-color) !important'
                },
                'tr:nth-child(2n)':{
                    'background-color':'transparent'
                },
                'th':{
                    // 'background-color':'var(--main-color)',
                    'color':'var(--main-color)',
                    'font-size':'1.2rem'
                },
                'th,td':{
                    'border-color':'var(--sub-color)'
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
        [
            /^border-(.*)$/,
            ([, c], { theme }) => {
                if (theme.colors[c]) return { 'border-color': theme.colors[c] }
            }
        ],
    ]
})