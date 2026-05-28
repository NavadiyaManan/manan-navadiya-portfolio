import { Component } from '@angular/core';
import { ExperienceService } from '../experience.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
experience: any; 

  constructor(private experienceService : ExperienceService) {
    this.experience = this.experienceService.calculateExperience();
  }
}
