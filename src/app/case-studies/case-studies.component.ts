import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CaseStudy {
  metric: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
}

@Component({
  selector: 'app-case-studies',
  imports: [CommonModule],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss'
})
export class CaseStudiesComponent {
  caseStudies: CaseStudy[] = [
    {
      metric: '93% Efficiency',
      title: 'Invoice Processing Automation',
      problem: 'Manual entry of invoices took 2-3 business days per batch and was highly error-prone.',
      solution: 'Designed a serverless OCR pipeline with Azure Blob Storage, Azure Functions, and a .NET Core validation API that integrates directly with accounting ledgers.',
      result: 'Reduced validation cycle times from 2 days to under 4 hours, achieving 93% automation.'
    },
    {
      metric: '50% Speedup',
      title: 'Reporting Performance & Query Optimization',
      problem: 'Critical BI analytics reports experienced timeout failures during month-end closes due to slow execution times on complex SQL tables.',
      solution: 'Refactored reporting schemas, created optimized partition views, and rewrote stored procedures with index alignments.',
      result: 'Halved average dashboard query runtimes, eliminating rendering timeouts entirely.'
    },
    {
      metric: '30 Hrs Saved/Mo',
      title: 'Automated Financial Ledger Synchronization',
      problem: 'Accounting teams manually cross-referenced transaction records between business workflows and QuickBooks Online daily.',
      solution: 'Built a secure OAuth 2.0 automated pipeline in Angular and .NET Core to sync bulk ledger entries via batch processing APIs.',
      result: 'Reconciliations are now automated in seconds, saving more than 30 hours of work per month.'
    }
  ];
}
