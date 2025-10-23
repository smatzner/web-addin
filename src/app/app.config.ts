import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config'
import Aura from '@primeng/themes/aura';
import {definePreset} from '@primeuix/themes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: {
              50: '{noir.50}',
              100: '{noir.100}',
              200: '{noir.200}',
              300: '{noir.300}',
              400: '{noir.400}',
              500: '{noir.500}',
              600: '{noir.600}',
              700: '{noir.700}',
              800: '{noir.800}',
              900: '{noir.900}',
              950: '{noir.950}'
            }
          }
        })
      }
    })
  ]
};
