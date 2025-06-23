import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-confirm-dialog',
  standalone:false,
  template: `
    <h2 mat-dialog-title>Leave Page?</h2>
    <mat-dialog-content>
      Are you sure you want to leave this page? Any unsaved changes will be lost.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(false)">Stay</button>
      <button mat-button color="warn" (click)="dialogRef.close(true)">Exit</button>
    </mat-dialog-actions>
  `
})
export class ExitConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ExitConfirmDialogComponent>) {}
}
