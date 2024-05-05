import { Component, OnInit } from "@angular/core";
import AuthService from "../auth/auth.service";
import User from "../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  editableName: string = '';
  editableEmail: string = '';

  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getUserListener().subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  updateName(name: string) {
    if (!this.user) return;
    const updatedUser: User = {
      ...this.user,
      name: name,
      email: this.user.email, // Assuming email and other fields are already defined
      isAdmin: this.user.isAdmin ?? false, // Fallback if undefined
      createdAt: this.user.createdAt ?? new Date() // Example fallback
    };
    this.authService.updateUser(updatedUser).subscribe({
      next: (user) => {
        console.log('Name update successful', user);
        this.user = user; // Assuming updateUser returns a full User object
      },
      error: (error) => console.error('Name update failed', error)
    });
  }

  updateEmail(email: string) {
    if (!this.user) return;
    const updatedUser: User = {
      ...this.user,
      name: this.user.name, // Keep the existing name
      email: email,
      isAdmin: this.user.isAdmin ?? false,
      createdAt: this.user.createdAt ?? new Date()
    };
    this.authService.updateUser(updatedUser).subscribe({
      next: (user) => {
        console.log('Email update successful', user);
        this.user = user; // Assuming updateUser returns a full User object
      },
      error: (error) => console.error('Email update failed', error)
    });
  }

  onDeleteAccount() {
    if (!this.user) return; // Check if user is defined
    this.authService.deleteUser(this.user._id!).subscribe({ // Use non-null assertion for _id
      next: () => {
        console.log('Account deleted');
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => console.error('Delete failed', error)
    });
  }
}
