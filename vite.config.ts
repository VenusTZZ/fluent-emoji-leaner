// vite.config.ts
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetAttributify,presetUno } from 'unocss'
export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      /* options */
      presets: [
        presetAttributify({ /* options */ }),
        presetUno(),
          // ...other presets
        ],
    }),
  ],
});
