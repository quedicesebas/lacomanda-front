import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { NgxSeo } from '@avivharuzi/ngx-seo';
import { Observable, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private firestore = inject(Firestore);

  // State
  hostname = 'lafocachera.co';
  seo$ = of<NgxSeo | undefined>(undefined);
  seo = toSignal(this.seo$);

  setHostname(hostname?: string) {
    if (hostname && hostname != 'localhost' && hostname != '127.0.0.1') {
      this.hostname = hostname;
    }

    if (this.hostname) {
      let brandId$ = this.getDocById<{ storeId: string }>(
        'storeDomains',
        this.hostname
      );

      this.seo$ = brandId$.pipe(
        switchMap((brandDomain) => {
          return this.getDocById<NgxSeo>('seoConfigs', brandDomain!.storeId);
        })
      );
    }
  }

  getDocById<T>(collectionName: string, id: string): Observable<T> {
    return (
      (docData(doc(this.firestore, `${collectionName}/${id}`)) as Observable<T>)
        // Add id
        .pipe(
          map((o) => {
            return { id: id, ...o };
          })
        )
    );
  }
}
