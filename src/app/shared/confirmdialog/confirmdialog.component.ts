import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone:false,
  template: `
    <h2 mat-dialog-title>Confirm Delete</h2>
    <mat-dialog-content>Are you sure you want to delete <b>{{ data.email }}</b>?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmdialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public dialogRef: MatDialogRef<ConfirmdialogComponent>
  ) {}
}
