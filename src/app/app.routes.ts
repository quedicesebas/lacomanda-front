import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { NgxSeo } from '@avivharuzi/ngx-seo';
import { HomeComponent } from './pages/home.component';
import { NotFoundComponent } from './pages/not-found.component';
import { MainService } from './services/main.service';

export const seoResolver: ResolveFn<NgxSeo | undefined> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(MainService).seo$;
};

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    //resolve: { seo: seoResolver },
  },
  { path: '**', component: NotFoundComponent },
];
