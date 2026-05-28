import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  showScrollTop = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.showScrollTop = window.scrollY > 500;
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  smoothScroll(fragment: string): void {
    const cleanFragment = fragment.replace('#', '');
    this.router.navigate([], { fragment: cleanFragment }).then(() => {
      const element = document.querySelector('#' + cleanFragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
