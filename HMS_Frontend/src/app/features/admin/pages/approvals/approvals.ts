import { ChangeDetectorRef, Component } from '@angular/core';
import { ApprovalService } from '../../../../services/approvalServices/approval-service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-approvals',
  imports: [CommonModule,DatePipe],
  templateUrl: './approvals.html',
  styleUrl: './approvals.css',
})
export class AdminApprovals {

  approvals: any[] = [];
  tab: string = 'PENDING';

  constructor(private approvalService: ApprovalService, private cd : ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
  }

  changeTab(tab: string) {
    this.tab = tab;
    this.load();
  }

  load() {
    this.approvalService.getApprovals(this.tab).subscribe(res => {
      this.approvals = res.data;
      this.cd.detectChanges();
    });
  }

  approve(id: string) {
    if (confirm("Approve this request?")) {
      this.approvalService.approve(id).subscribe(() => {
        this.load();
      });
    }
  }

  reject(id: string) {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      this.approvalService.reject(id, reason).subscribe(() => {
        this.load();
      });
    }
  }
}
