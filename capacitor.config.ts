import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'reader.reeda.com',
  appName: 'reader-app',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
};

export default config;
