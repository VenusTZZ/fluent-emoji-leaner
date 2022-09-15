// vite.config.ts
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetAttributify,presetUno,presetIcons } from 'unocss'
export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      /* options */
      presets: [
        presetAttributify({ /* options */ }),
        presetUno(),
        presetIcons(),
          // ...other presets
        ],
    }),
  ],
});
