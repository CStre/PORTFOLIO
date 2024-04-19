import { Component, OnInit } from "@angular/core";
import AuthenticationService from "../services/auth.service";
import User from "../models/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLoggedIn = false;

    constructor(private authService: AuthenticationService) {}

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.authService.getUserListener().subscribe((user: User | null) => {
            this.isLoggedIn = user !== null;
            console.log(this.isLoggedIn)
        })
    }

    links = {
        loggedIn: [
            {path: "/", name: "Home"},
            {path: "addCat", name: "Add Cat"},
        ],
        loggedOut: [
            {path: "/", name: "Home"},
            {path: "login", name: "Log In"},
            {path: "register", name: "Register"}
        ]}

    logout() {
        this.authService.logout();
    }
}