import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  themeMode: 'light' | 'dark' | 'system' = 'system';
  isThemeDropdownOpen = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleThemeDropdown(): void {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
  }

  selectTheme(mode: 'light' | 'dark' | 'system'): void {
    this.themeMode = mode;
    this.isThemeDropdownOpen = false;
    this.applyTheme(mode);
  }

  applyTheme(mode: 'light' | 'dark' | 'system'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    try {
      localStorage.setItem('theme', mode);
      document.documentElement.setAttribute('data-theme', mode);
    } catch (e) {
      console.error('Error applying theme:', e);
    }
  }

  loadTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
      this.themeMode = saved || 'system';
      document.documentElement.setAttribute('data-theme', this.themeMode);
    } catch (e) {
      this.themeMode = 'system';
    }
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
