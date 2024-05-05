import { Component, OnInit } from '@angular/core';
import AuthenticationService from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthenticationService) {}

    ngOnInit() {
        this.authService.autoLogIn();
    }
}
