import { Component } from '@angular/core';

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      icon: 'fab fa-angular',
      title: 'Angular Frontend Development',
      description: 'Building high-performance, responsive single-page applications (SPAs) using Angular 19, TypeScript, RxJS, and clean state-management architectures.'
    },
    {
      icon: 'fas fa-code',
      title: '.NET Backend & Web API',
      description: 'Architecting secure, asynchronous RESTful APIs and microservices using ASP.NET Core, C#, Entity Framework Core, and robust authentication (SSO, OAuth2).'
    },
    {
      icon: 'fas fa-database',
      title: 'SQL Server Optimization',
      description: 'Designing highly scalable database architectures, optimizing slow-running queries, building efficient indexing, and managing complex multi-tenant data structures.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Dashboard & Admin Panels',
      description: 'Developing data-rich, interactive business intelligence (BI) dashboards with responsive charting, role-based controls, and clean analytics interfaces.'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'Workflow Automation Systems',
      description: 'Engineering rule-based worker engines, background job automation (Azure Functions), invoice/approval flows, and integrations reducing operational overhead.'
    },
    {
      icon: 'fas fa-plug',
      title: 'Third-Party API Integration',
      description: 'Integrating external APIs for secure accounting synchronization (QuickBooks, Sage Intacct, Xero), payment gateways, single sign-on (SSO), and cloud storage.'
    },
    {
      icon: 'fas fa-cogs',
      title: 'ERP & Business Systems',
      description: 'Creating customized enterprise resource planning (ERP) modules, workflow trackers, and automation pipelines supporting complex daily business operations.'
    },
    {
      icon: 'fas fa-tools',
      title: 'Bug Fixing & Maintenance',
      description: 'Providing reliable, long-term system refactoring, legacy system upgrades, security compliance fixes, and database migrations with minimal downtime.'
    }
  ];
}
