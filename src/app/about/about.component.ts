import { Component, Inject, PLATFORM_ID, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ExperienceService } from '../experience.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  experienceNum = 3.4;
  experience = '3.4';
  
  // Animated counters
  yearsCount = 0;
  projectsCount = 0;
  toolsCount = 0;
  
  @ViewChild('statsSection') statsSection!: ElementRef;

  constructor(
    private experienceService : ExperienceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private firebaseService: FirebaseService
  ) {
    const expStr = this.experienceService.calculateExperience();
    this.experience = expStr;
    this.experienceNum = parseFloat(expStr) || 4.2; // Fallback to 4.2 if parse fails
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.disconnect(); // Only animate once
        }
      });
    }, { threshold: 0.1 });

    if (this.statsSection) {
      observer.observe(this.statsSection.nativeElement);
    }
  }

  private animateCounters() {
    // Years counter
    const yearsTarget = this.experienceNum;
    const yearsInterval = setInterval(() => {
      if (this.yearsCount >= yearsTarget) {
        this.yearsCount = yearsTarget;
        clearInterval(yearsInterval);
      } else {
        this.yearsCount = parseFloat((this.yearsCount + 0.1).toFixed(1));
      }
    }, 50);

    // Projects counter
    const projectsTarget = 15; // Enterprise projects
    const projectsInterval = setInterval(() => {
      if (this.projectsCount >= projectsTarget) {
        this.projectsCount = projectsTarget;
        clearInterval(projectsInterval);
      } else {
        this.projectsCount++;
      }
    }, 80);

    // Tools counter
    const toolsTarget = 25; // Cloud and Core Tech
    const toolsInterval = setInterval(() => {
      if (this.toolsCount >= toolsTarget) {
        this.toolsCount = toolsTarget;
        clearInterval(toolsInterval);
      } else {
        this.toolsCount++;
      }
    }, 45);
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
