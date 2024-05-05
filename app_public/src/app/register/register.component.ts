import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import AuthService from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Ensure styleUrl is changed to styleUrls for array of styles
})
export class RegisterComponent {
  showLogin = false; // Controls which form is shown based on boolean state

  constructor(
    private authService: AuthService, // Dependency injection for AuthService
    private router: Router // Dependency injection for Router to handle navigation
  ) {}

  ngOnInit() {
    // Subscribe to the user changes to automatically navigate away if logged in
    this.authService.getUserListener().subscribe(
      (user) => {
        if (user !== null) {
          this.router.navigate(['/']); // Redirect to home if already logged in
        }
      });
  }

  toggleForm() {
    // Toggle the boolean to show either login or register form
    this.showLogin = !this.showLogin;
  }

  register(form: NgForm) {
    // Call register method from AuthService passing user details and password
    this.authService.register({
      user: {
        email: form.value.email,
        name: form.value.name,
        isAdmin: false // Static value for isAdmin as false
      },
      password: form.value.password
    });
    console.log("Registration Sent: Email:", form.value.email,
    "Name:", form.value.name,
    "Is Admin:", false,
    "Password:", form.value.password); // Logging for debugging
  }

  login(form: NgForm) {
    // Call login method from AuthService passing email and password
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
    console.log("Login Attempt: Email:", form.value.email,
    "Password:", form.value.password); // Logging for debugging
  }
}
