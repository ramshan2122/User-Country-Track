import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  private searchSubject = new Subject<string>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];

    
    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.filteredUsers = this.filterUsers(term);
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  filterUsers(term: string): User[] {
    const lowerTerm = term.toLowerCase();
    return this.users.filter(user =>
      `${user.firstName} ${user.lastName} ${user.email} ${user.country}`.toLowerCase().includes(lowerTerm)
    );
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.filteredUsers = [...this.users];
  }

  editUser(email: string): void {
    this.router.navigate(['/edit', email]);
  }

  deleteUser(email: string): void {
    this.userService.deleteUser(email);
    this.users = this.userService.getUsers();
    this.filteredUsers = this.filterUsers(this.searchTerm);
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }
}
