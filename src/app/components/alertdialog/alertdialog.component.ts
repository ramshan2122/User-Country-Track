import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alertdialog',
  standalone: false,
  templateUrl: './alertdialog.component.html',
  styleUrl: './alertdialog.component.css'
})
export class AlertdialogComponent {
constructor(
    public dialogRef: MatDialogRef<AlertdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; message: string }
  ) {}
}
