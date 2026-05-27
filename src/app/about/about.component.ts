import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  experience: any; 

  constructor(
    private experienceService : ExperienceService,
    private router: Router
  ) {
    this.experience = this.experienceService.calculateExperience();
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
