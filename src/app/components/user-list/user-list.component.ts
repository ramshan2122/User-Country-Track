import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false
})
export class UserListComponent {
  public userService = inject(UserService);
  public router = inject(Router);
  dataSource = new MatTableDataSource<User>([]);
  users = signal<User[]>(this.userService.getUsers());
  searchTerm = signal('');

  displayedColumns: string[] = ['fullName', 'email', 'country', 'createdAt', 'actions'];

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users();

    return this.users().filter(user =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.country}`.toLowerCase().includes(term)
    );
  });
  constructor() {
    effect(() => {
      this.dataSource.data = this.filteredUsers();
    });
  }
  get filteredUsersList(): User[] {
  return this.filteredUsers(); 
}
get trimmedSearch(): string {
  return this.searchTerm().trim();
}

  onSearch(term: string): void {
    this.searchTerm.set(term);
  }

  clearFilter(): void {
    this.searchTerm.set('');
  }

  editUser(email: string): void {
    this.router.navigate(['/edit', email]);
  }

  deleteUser(email: string): void {
    this.userService.deleteUser(email);
    this.users.set(this.userService.getUsers());
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }
}
