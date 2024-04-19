import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import AuthService from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.authService.getUserListener().subscribe(
      (user) => {
        if (user !== null) {
            this.router.navigate(['/']);
        }
      })
  }

  register(form: NgForm) {
    this.authService.register({
      user: {email: form.value.email, name: form.value.name},
      password: form.value.password
    });
  }
}
