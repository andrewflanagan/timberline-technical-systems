import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  site: 'https://timberlinetechnicalsystems.com',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
