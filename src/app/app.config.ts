import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NgxSeoModule } from '@avivharuzi/ngx-seo';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(NgxSeoModule.forRoot()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'la-comanda-co',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
