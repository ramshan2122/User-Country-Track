import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone:false
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userService.getUsers();
    this.filterUsers();
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.country}`.toLowerCase().includes(term)
    );
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.filterUsers();
  }

  editUser(email: string): void {
    this.router.navigate(['/edit', email]);
  }

  deleteUser(email: string): void {
    this.userService.deleteUser(email);
    this.loadUsers();
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }
}
