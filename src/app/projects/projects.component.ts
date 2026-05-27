import { Component } from '@angular/core';

export interface Project {
  title: string;
  category: 'professional' | 'academic';
  badge: string;
  summary: string;
  tech: string[];
  details: string[];
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  activeFilter: 'all' | 'professional' | 'academic' = 'all';

  projects: Project[] = [
    {
      title: 'Business Intelligence Platform (PathQuest BI)',
      category: 'professional',
      badge: 'PathQuest Solutions',
      summary: 'Built and enhanced an enterprise BI platform delivering real-time financial and accounting insights.',
      tech: ['.NET Core', 'Angular', 'Entity Framework (DB First)', 'MS SQL Server'],
      details: [
        'Designed a multi-tenant database architecture with company-wise isolated databases for scalability and security.',
        'Developed backend services using .NET Core and Entity Framework (Database First).',
        'Implemented financial reports (balance sheet, cash flow) with support for 4-4-5 and 4-4-4 fiscal calendars.',
        'Developed budgeting and variance analysis features for actual vs planned comparisons.'
      ]
    },
    {
      title: 'Accounts Payable Automation',
      category: 'professional',
      badge: 'PathQuest Solutions',
      summary: 'Architected a scalable backend system for high-volume accounts payable automation.',
      tech: ['.NET Core', 'Azure Functions', 'Worker Services', 'MS SQL Server'],
      details: [
        'Integrated Sage Intacct, Xero, and QuickBooks Online (QBO) for real-time financial synchronization.',
        'Automated bill, payment, and PO approval workflows, reducing manual effort and processing time.',
        'Implemented SSO authentication, cloud document integrations, and email notification services.',
        'Optimized backend services and SQL queries for performance and reliability.'
      ]
    },
    {
      title: 'Income Tax Returns Platform',
      category: 'professional',
      badge: 'Technomark Solutions',
      summary: 'Developed a responsive web-based ITR application for a Japanese client.',
      tech: ['Angular', 'TypeScript', 'HTML5', 'SCSS', '.NET 6'],
      details: [
        'Built Angular UI components with focus on usability and responsiveness.',
        'Implemented Japanese localization, dynamic questionnaires, and system notifications.',
        'Delivered features aligned with client requirements and project timelines.'
      ]
    },
    {
      title: 'Productivity Management System',
      category: 'professional',
      badge: 'Technomark Solutions',
      summary: 'Developed a productivity tracking system with role-based access control (RBAC).',
      tech: ['.NET', 'Azure Functions', 'MySQL'],
      details: [
        'Implemented time logging, client query modules, and automated background jobs using Azure Functions.',
        'Built performance dashboards providing real-time visibility for management.'
      ]
    },
    {
      title: 'Tax Automation for QuickBooks Online (QBO)',
      category: 'professional',
      badge: 'PathQuest Solutions',
      summary: 'Integrated QuickBooks Online OAuth for secure authentication and real-time data access.',
      tech: ['Angular', '.NET Core', 'MySQL'],
      details: [
        'Developed an Excel import module with advanced validation and error handling.',
        'Automated reversal entries and bulk Chart of Accounts (COA) operations, reducing manual data entry effort by ~80%.',
        'Improved accuracy and efficiency of tax-related financial workflows.'
      ]
    },
    {
      title: 'Emo-Music – Emotion-Based Music Recommendation System',
      category: 'academic',
      badge: 'MCA Project',
      summary: 'Developed an AI-driven music recommendation system that analyzes real-time facial expressions to detect user emotions.',
      tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API'],
      details: [
        'Implemented computer vision techniques for face detection and emotion recognition using OpenCV and DeepFace.',
        'Integrated Spotify API to generate personalized music recommendations based on detected emotional states.',
        'Designed the system to deliver real-time, emotion-aware user experiences through automated content selection.'
      ]
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  setFilter(filter: 'all' | 'professional' | 'academic'): void {
    this.activeFilter = filter;
  }
}
