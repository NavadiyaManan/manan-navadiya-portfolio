import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectsComponent } from "./projects/projects.component";
import { SkillsComponent } from "./skills/skills.component";
import { EducationComponent } from "./education/education.component";
import { ExperienceComponent } from "./experience/experience.component";
import { AboutComponent } from "./about/about.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ServicesComponent } from "./services/services.component";
import { ContactComponent } from "./contact/contact.component";
import { CaseStudiesComponent } from "./case-studies/case-studies.component";
import { GithubStatsComponent } from "./github-stats/github-stats.component";

@Component({
  selector: 'app-root',
  imports: [
    ProjectsComponent, 
    SkillsComponent, 
    EducationComponent, 
    ExperienceComponent, 
    AboutComponent, 
    HeaderComponent, 
    FooterComponent,
    ServicesComponent,
    ContactComponent,
    CaseStudiesComponent,
    GithubStatsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'manan-navadiya-portfolio';
}
