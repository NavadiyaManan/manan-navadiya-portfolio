import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor() { }
  
  startDate: string = '2023-01-01';
  
  calculateExperience(): string {
    const currentDate = new Date();  // Get current date
    const start = new Date(this.startDate);  // Convert start date to Date object
    const diffInMilliseconds = currentDate.getTime() - start.getTime();  // Difference in milliseconds
    const years = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365);  // Convert to years
    return years.toFixed(1);  // Return years rounded to one decimal place
  }
}
