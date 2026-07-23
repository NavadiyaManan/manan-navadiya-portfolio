import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';

export interface Project {
  title: string;
  company?: string;
  badge: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  details: string[];
  tags: string[]; // ['angular', 'dotnet', 'fullstack', 'sql']
  demoUrl: string;
  githubUrl: string;
  businessImpact: string;
  workflowSteps: string[];
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  activeFilter: 'all' | 'angular' | 'dotnet' | 'fullstack' | 'sql' = 'all';
  selectedProject: Project | null = null;

  constructor(private firebaseService: FirebaseService) {}

  projects: Project[] = [
    {
      title: 'Unnati – Loyalty & Rewards Platform (Astral Paints)',
      company: 'Astral Ltd',
      badge: 'Loyalty & Rewards',
      summary: 'Designed and developed secure RESTful APIs for the Unnati mobile application used by Astral Paint dealers and partners.',
      description: 'A comprehensive loyalty and rewards platform for Astral Ltd. (Astral Paints). Developed secure RESTful backend APIs powering point management, campaign tracking, user authentication, and Pine Labs API redemptions for dealers and partners.',
      image: 'unnati_astral.png',
      tech: ['.NET Core Web API', 'C#', 'SQL Server', 'REST API', 'Pine Labs API'],
      details: [
        'Designed and developed secure RESTful APIs for the Unnati mobile application used by Astral Paint dealers and partners.',
        'Developed APIs for reward point management, redemption history, user authentication, and campaign management.',
        'Implemented secure API communication, request validation, exception handling, and comprehensive logging.',
        'Optimized SQL queries and stored procedures to improve API performance and reduce response time.',
        'Collaborated with Android and frontend teams to ensure seamless integration of backend services.'
      ],
      tags: ['dotnet', 'fullstack', 'sql'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Powered high-concurrency reward transactions, point tracking, and seamless redemption workflows for Astral Paint dealers.',
      workflowSteps: [
        'User authentication and partner security validation',
        'Reward points accumulation & campaign qualification engine',
        'Pine Labs API integration for point redemptions',
        'Optimized SQL stored procedure execution for fast response times',
        'Comprehensive audit logging and mobile API payload delivery'
      ]
    },
    {
      title: 'Business Intelligence Platform (PathQuest BI)',
      company: 'PathQuest',
      badge: 'Enterprise Platform',
      summary: 'Enhanced an enterprise BI platform delivering real-time financial and accounting insights with multi-tenant isolation.',
      description: 'A multi-tenant business intelligence portal serving large-scale accounting firms. Built to render complex financial reports, budgeting analyses, and variance comparisons across various custom fiscal calendars.',
      image: 'pathquest_bi.png',
      tech: ['Angular', '.NET Core', 'MS SQL Server', 'Entity Framework'],
      details: [
        'Designed a multi-tenant database architecture with company-wise isolated databases for database security and reliability.',
        'Developed budgeting and variance analysis modules comparing actual spending against financial plans.',
        'Implemented support for 4-4-5 and 4-4-4 fiscal calendars for professional accounting alignment.'
      ],
      tags: ['angular', 'dotnet', 'fullstack', 'sql'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Improved report generation speed by 45% and secured multi-tenant isolation for 100+ accounting clients.',
      workflowSteps: [
        'User authentication and secure tenant identification',
        'Dynamic connection string swapping to isolated database',
        'Data extraction via optimized Entity Framework repositories',
        'Transformation into accounting reporting models',
        'Rendering on interactive Angular charts and exportable grids'
      ]
    },
    {
      title: 'Accounts Payable Automation Engine',
      company: 'PathQuest',
      badge: 'Workflow Automation',
      summary: 'Architected backend worker pipelines automating invoice workflows and syncing ERP accounting platforms.',
      description: 'An automated billing and invoice approval pipeline. Integrates directly with third-party cloud accounting packages, running rule-based worker engines to route bills through organizational validation workflows.',
      image: 'ap_automation.png',
      tech: ['.NET Core', 'Azure Functions', 'SQL Server', 'Sage Intacct', 'Xero'],
      details: [
        'Integrated Xero, Sage Intacct, and QuickBooks Online APIs for seamless real-time ledger synchronization.',
        'Developed background job automation via Azure Functions and worker roles for invoice imports.',
        'Built dynamic validation rule checkers routing bills through multi-level manager approvals.'
      ],
      tags: ['dotnet', 'fullstack', 'sql'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Reduced average invoice approval cycles from 5 days to under 4 hours, automating 80% of data entries.',
      workflowSteps: [
        'PDF Invoice upload to Azure Blob Storage',
        'Triggering OCR worker to extract metadata',
        'Rule engine evaluation to route to managers',
        'Approval/rejection tracking via real-time dashboard notifications',
        'Asynchronous ledger synchronization via accounting APIs'
      ]
    },
    {
      title: 'Income Tax Returns (ITR) Portal',
      company: 'Technomark Solutions',
      badge: 'Client Web Portal',
      summary: 'Developed a localized tax application with complex questionnaire flows for a Japanese market.',
      description: 'A customer-facing web portal allowing Japanese clients to submit and calculate complex tax returns. Features highly localized questionnaires and step-by-step submission tracking.',
      image: 'itr_platform.png',
      tech: ['Angular', 'TypeScript', '.NET 6', 'SCSS'],
      details: [
        'Developed fully localized multi-step Angular questionnaire workflows with reactive inputs.',
        'Implemented client notification banners and system warnings using reactive state streams.',
        'Built secure document upload modules handling client tax evidence files.'
      ],
      tags: ['angular', 'fullstack'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Successfully deployed in Japan, processing over 12,000 seasonal tax returns in the first launch year.',
      workflowSteps: [
        'User profile creation and tax bracket classification',
        'Multi-step reactive forms collecting income and deductible data',
        'Real-time tax calculation using C# backend rules engines',
        'File uploads to cloud storage for tax documents',
        'Final report compilation and receipt submission'
      ]
    },
    {
      title: 'QuickBooks Online Tax Sync Integration',
      company: 'Technomark Solutions',
      badge: 'ERP Integration',
      summary: 'Designed OAuth 2.0 sync integrations and Excel ingestion tools for QuickBooks Online.',
      description: 'A custom ERP integration connecting corporate accounting files to QuickBooks Online. Features OAuth authentication, bulk account configuration tools, and advanced data verification spreadsheet ingestion.',
      image: 'qbo_tax_automation.png',
      tech: ['Angular', '.NET Core', 'MySQL', 'QBO OAuth API'],
      details: [
        'Orchestrated QuickBooks OAuth 2.0 flow for secure account linking and API token management.',
        'Built an Excel parser utilizing advanced row/cell data validations.',
        'Automated reversed bulk journal entries reducing accounting data errors.'
      ],
      tags: ['angular', 'dotnet', 'fullstack'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Saved corporate accounts teams up to 30 hours per month by automating ledger reconciliations.',
      workflowSteps: [
        'OAuth 2.0 connection setup with QuickBooks company file',
        'Bulk Excel upload of tax entries',
        'Row-by-row data schema validation and error highlighting',
        'Bulk data injection via QuickBooks Batch APIs',
        'Reversal ledger validation reports generation'
      ]
    },
    {
      title: 'Productivity Management Dashboard',
      company: 'Technomark Solutions',
      badge: 'SaaS Tool',
      summary: 'Developed a tracking portal for tasks, client inquiries, and role-based performance metrics.',
      description: 'An internal team coordination tool built to monitor developer task timelines, track incoming client technical queries, and aggregate performance metrics in real-time dashboards.',
      image: 'productivity_system.png',
      tech: ['.NET Core', 'Azure Functions', 'MySQL', 'Angular'],
      details: [
        'Implemented granular role-based access control (RBAC) separating managers and engineers.',
        'Aggregated background time logging reports using Azure timer triggers.',
        'Designed interactive query management queues with priority-based sorting.'
      ],
      tags: ['angular', 'dotnet', 'fullstack'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Enabled managers to improve project delivery timeline accuracy by 25% through historical performance analytics.',
      workflowSteps: [
        'Worker login and daily task select',
        'Time tracking stopwatch logs captured asynchronously',
        'Aggregation of developer metrics on a dashboard panel',
        'Automated reports delivery via email triggers'
      ]
    },
    {
      title: 'Emo-Music Recommendation Engine',
      badge: 'AI / CV Project',
      summary: 'Academic project utilizing OpenCV face emotion analysis to generate Spotify playlist recommendation streams.',
      description: 'An AI-powered music recommendation app. Analyzes real-time camera video streams, classifies the user\'s facial expression using deep learning, and fetches related Spotify playlists.',
      image: 'emo_music.png',
      tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'HTML5/CSS3'],
      details: [
        'Implemented computer vision face trackers and classifier models using OpenCV and DeepFace.',
        'Integrated Spotify Web APIs for automated playlist queries and player controls.',
        'Structured the pipeline to run real-time predictions without interface lags.'
      ],
      tags: ['academic'],
      demoUrl: '#',
      githubUrl: '#',
      businessImpact: 'Developed as an MCA thesis project, demonstrating real-time mood-to-music correlations with 88% model accuracy.',
      workflowSteps: [
        'User launches camera permission request',
        'Real-time frames fed into DeepFace neural network classifier',
        'Emotion prediction matching (Happy, Sad, Angry, Neutral, etc.)',
        'Spotify Web API playlist fetch based on emotion tags',
        'Audio player rendering music recommendations stream'
      ]
    },
    {
      title: 'Navkar Engineers',
      badge: 'Industrial Web Portal',
      summary: 'Built a modern digital presence for Navkar Engineers with product visibility, lead capture, and inquiry-friendly navigation.',
      description: 'A polished business website for Navkar Engineers showcasing industrial equipment offerings and making it easier for customers to discover products and request quotations.',
      image: 'navkar_engineers.png',
      tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'Netlify'],
      details: [
        'Designed a responsive experience tailored for industrial product discovery and customer engagement.',
        'Structured content sections for product highlights, company overview, and inquiry-friendly contact flows.',
        'Optimized the site for fast page loads and a professional brand presentation.'
      ],
      tags: ['angular', 'fullstack'],
      demoUrl: 'https://navkar-engineers.netlify.app/',
      githubUrl: '#',
      businessImpact: 'Improved online visibility for industrial offerings and simplified customer inquiry handling.',
      workflowSteps: [
        'Visitor lands on the homepage and browses featured offerings',
        'User explores product-focused sections and business details',
        'Inquiry/contact actions guide visitors toward quote requests',
        'Lead capture supports faster sales follow-up'
      ]
    },
    {
      title: 'RK Granito',
      badge: 'Corporate Website',
      summary: 'Created a modern corporate website for RK Granito to highlight its business identity and attract client inquiries.',
      description: 'A clean, modern website for RK Granito with strong visual storytelling, structured product and company information, and clear contact paths for prospective clients.',
      image: 'rk_granito.png',
      tech: ['Angular', 'TypeScript', 'Tailwind CSS', 'Netlify'],
      details: [
        'Crafted a professional UI aligned with the brand and industry positioning.',
        'Organized business content into accessible sections for better navigation and engagement.',
        'Included clear calls to action to support client inquiry and lead generation.'
      ],
      tags: ['angular', 'fullstack'],
      demoUrl: 'https://www.rkgranito.com/',
      githubUrl: '#',
      businessImpact: 'Strengthened digital presence and made the brand more accessible for B2B opportunities.',
      workflowSteps: [
        'Visitor views the homepage and brand overview',
        'User navigates through product and business content sections',
        'Contact and inquiry actions are surfaced clearly',
        'Potential clients can connect quickly with the business'
      ]
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.tags.includes(this.activeFilter));
  }

  setFilter(filter: 'all' | 'angular' | 'dotnet' | 'fullstack' | 'sql'): void {
    this.activeFilter = filter;
  }

  openModal(project: Project): void {
    this.selectedProject = project;
    this.firebaseService.logCtaClick(`project_view_${project.title.replace(/\s+/g, '_').toLowerCase()}`);
    // Lock scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedProject = null;
    // Restore scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  trackProjectLink(projectTitle: string, linkType: 'github' | 'demo'): void {
    this.firebaseService.logCtaClick(`project_${linkType}_${projectTitle.replace(/\s+/g, '_').toLowerCase()}`);
  }
}
