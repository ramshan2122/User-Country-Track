import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
@Injectable({ providedIn: 'root' })
export class UserService {
  private storageKey = 'users';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email === email);
  }

  createUser(user: User):boolean {
    const users = this.getUsers();
    const exists = users.find(u => u.email === user.email);
    if (exists) return false;
    user.createdAt = new Date().toISOString();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers().map(u =>
      u.email === updatedUser.email ? { ...updatedUser, createdAt: u.createdAt } : u
    );
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  deleteUser(email: string): void {
    const users = this.getUsers().filter(u => u.email !== email);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}