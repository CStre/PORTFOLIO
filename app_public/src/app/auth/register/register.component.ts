import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  AuthService  from '../auth.service'; // Check import path
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  showLogin = false; // Controls which form is shown

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Subscribe to user changes
    this.authService.getUserListener().subscribe({
      next: (user) => {
        if (user) {
          console.log("User is already logged in, navigating to home.");
          this.router.navigate(['/']);
        }
      },
      error: (error) => console.error('Error in user subscription', error)
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
    console.log("Toggle form view:", this.showLogin ? "Login" : "Register");
  }

  register() {
    if (this.registerForm.valid) {
      console.log("Registration Sent: ", this.registerForm.value);
      this.authService.register({
        user: {
          email: this.registerForm.value.email,
          name: this.registerForm.value.name,
          isAdmin: false // Assuming isAdmin is always false on registration
        },
        password: this.registerForm.value.password
      });
    }
  }

  login() {
    if (this.loginForm.valid) {
      console.log("Login Attempt: ", this.loginForm.value);
      this.authService.login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      });
    }
  }

}
