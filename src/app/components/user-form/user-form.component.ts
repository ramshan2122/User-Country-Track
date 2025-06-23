import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CountryService } from '../../services/country.service';
import { User } from '../../model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { ExitConfirmDialogComponent } from '../exit-confirm-dialog/exit-confirm-dialog.component';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

declare var bootstrap: any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: false
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  countries: string[] = [];
  isEdit = false;
  public exitModal: any;

  constructor(

    public fb: FormBuilder,
    public userService: UserService,
    public countryService: CountryService,
    public route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });


    this.countryService.getCountries().subscribe({
      next: (data: any[]) => {
        this.countries = data.map(c => c?.name?.common).filter(Boolean).sort();
      },
      error: err => {
        console.error('Error fetching countries:', err);
      }
    });


    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.isEdit = true;
      const user = this.userService.getUserByEmail(email);
      if (user) {
        this.userForm.patchValue(user);
        this.userForm.get('email')?.disable();
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.getRawValue();
    const user: User = { ...formValue, createdAt: new Date().toISOString() };

    if (this.isEdit) {
      this.userService.updateUser(user);
      this.router.navigate(['/users']);
    } else {
      const created = this.userService.createUser(user);
      if (!created) {
        this.dialog.open(AlertdialogComponent, {
          data: {
            title: 'User Already Exists',
            message: 'A user with this email already exists.'
          }
        });
        return;
      }
      this.router.navigate(['/users']);
    }

  }



  confirmExit(): void {
    if (this.exitModal) {
      this.exitModal.hide();
    }

    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 200);
  }



  onCancel(): void {
    const modalElement = document.getElementById('exitConfirmModal');
    if (modalElement) {
      this.exitModal = new bootstrap.Modal(modalElement);
      this.exitModal.show();
    }
  }

  stayOnPage(): void {
    if (this.exitModal) {
      this.exitModal.hide();
    }
  }
  openExitDialog(): void {
    const dialogRef = this.dialog.open(ExitConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmExit();
      } else {
        this.stayOnPage();
      }
    });
  }
}