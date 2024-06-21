import { CommonModule } from '@angular/common';
import { Component, Signal, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { NgxSeo } from '@avivharuzi/ngx-seo';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>home works! {{ seo() | json }}</p> `,
  styles: ``,
})
export class HomeComponent {
  private mainService = inject(MainService);
  seo: Signal<NgxSeo | undefined>;

  constructor(title: Title) {
    this.seo = toSignal(this.mainService.seo$);
    effect(() => {
      if (this.seo()) {
        title.setTitle(this.seo()?.title!);
      }
    });
  }
}
