import { Component, Inject, PLATFORM_ID, OnInit, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  themeMode: 'light' | 'dark' | 'system' = 'light';
  isThemeDropdownOpen = false;
  
  // ScrollSpy active section
  activeSection = 'home';
  
  // Typing animation variables
  typedText = '';
  private roles = [
    'Angular & .NET Full Stack Developer',
    'ERP & Business Systems Engineer',
    'SQL Server Database Optimizer',
    'SaaS Workflow Automation Architect'
  ];
  private currentRoleIndex = 0;
  private currentCharIndex = 0;
  private isDeleting = false;
  private typingSpeed = 80;
  private erasingSpeed = 40;
  private pauseTime = 1500;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.loadTheme();
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingAnimation();
    }
  }

  // ScrollSpy listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const scrollPosition = window.scrollY + 200; // Offset for triggers
    const sections = ['about', 'services', 'experience', 'education', 'skills', 'projects', 'contact'];
    
    // Check if we are near the top (Home/Hero)
    if (window.scrollY < 300) {
      this.activeSection = 'home';
      return;
    }
    
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  // Typing effect logic
  private startTypingAnimation() {
    const handleTyping = () => {
      const currentRole = this.roles[this.currentRoleIndex];
      
      if (!this.isDeleting) {
        // Typing state
        this.typedText = currentRole.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
        
        if (this.currentCharIndex === currentRole.length) {
          this.isDeleting = true;
          setTimeout(handleTyping, this.pauseTime);
        } else {
          setTimeout(handleTyping, this.typingSpeed);
        }
      } else {
        // Erasing state
        this.typedText = currentRole.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
        
        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          setTimeout(handleTyping, 500);
        } else {
          setTimeout(handleTyping, this.erasingSpeed);
        }
      }
    };
    
    handleTyping();
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
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      const resolvedTheme = saved === 'dark' ? 'dark' : 'light';
      this.themeMode = resolvedTheme;
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    } catch (e) {
      this.themeMode = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
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

  trackCta(name: string): void {
    this.firebaseService.logCtaClick(name);
  }

  trackResume(): void {
    this.firebaseService.logResumeDownload();
  }
}
