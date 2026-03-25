import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNativeDateAdapter(),
    importProvidersFrom(TranslateModule.forRoot()),
    ...provideTranslateHttpLoader({prefix: './i18n/', suffix: '.json'}),
  ],
};
