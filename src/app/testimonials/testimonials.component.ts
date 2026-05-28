import { Component } from '@angular/core';

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  testimonials: TestimonialItem[] = [
    {
      quote: "Manan was instrumental in building our web-based tax returns application. His attention to detail in handling complex Japanese localization and designing interactive components made the system a huge success.",
      name: "Takahiro Sato",
      role: "Director of Engineering",
      company: "NexusTax (Tokyo)",
      rating: 5
    },
    {
      quote: "Working with Manan on our accounts payable automation platform was a game changer. He designed secure integrations with Sage Intacct and QuickBooks, reducing manual data entry for our enterprise clients by ~80%.",
      name: "Sarah Jenkins",
      role: "Product Director",
      company: "PathQuest Solutions",
      rating: 5
    },
    {
      quote: "Manan brings rare full-stack expertise. He refactored our multi-tenant BI dashboard, optimized slow-running SQL queries, and implemented seamless SSO. He communicates clearly and delivers reliable, production-ready code.",
      name: "David Miller",
      role: "Lead Architect",
      company: "Astral Ltd",
      rating: 5
    }
  ];
}
