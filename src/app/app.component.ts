import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  InjectionToken,
  Optional,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainService } from './services/main.service';

export const HOSTNAME = new InjectionToken<string>('HOSTNAME');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly mainService = inject(MainService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(HOSTNAME) @Optional() hostname?: string
  ) {
    this.mainService.setHostname(
      hostname ??
        (isPlatformBrowser(platformId) ? window.location.hostname : '')
    );
  }
}
