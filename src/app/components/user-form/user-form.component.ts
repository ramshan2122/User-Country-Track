import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CountryService } from '../../services/country.service';
import { User } from '../../model/user.model';
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
  private exitModal: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
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
        alert('A user with this email already exists.');
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

}