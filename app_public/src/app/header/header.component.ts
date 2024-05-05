import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import AuthenticationService from "../services/auth.service";
import User from "../models/user.model";
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

interface Link {
    name: string;
    path: string;
    icon: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @ViewChild('sidenav') sidenav!: MatSidenav;
    isMenuOpen = false;
    isHome = true;
    isAdmin = false;  // Flag to check if user is admin
    links: Link[] = [];

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {
        console.log('HeaderComponent initialized');
    }

    ngOnInit(): void {
      console.log('Component OnInit started');
      this.authService.getUserListener().subscribe((user: User | null) => {
          console.log('User status updated:', user);
          this.updateAdminStatusAndLinks();  // Update based on local storage
      });

      // Initial check for admin status on component load
      this.updateAdminStatusAndLinks();
    }

    updateAdminStatusAndLinks(): void {
        console.log('Updating admin status...');
        // Check isAdmin from local storage instead of user object
        this.isAdmin = JSON.parse(localStorage.getItem("admin") || "false");
        console.log('isAdmin:', this.isAdmin);
        this.updateLinks();
    }

    @HostListener('window:scroll', ['$event'])
    checkIfHomeSection() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.isHome = scrollPosition < 200;
        console.log('Home section visibility:', this.isHome);
    }

    toggleMenu() {
        console.log('Toggling menu');
        this.isMenuOpen = !this.isMenuOpen;
        this.sidenav.toggle();
        console.log('Menu open status:', this.isMenuOpen);
    }

    closeMenu() {
        console.log('Closing menu');
        if (this.isMenuOpen) {
            this.isMenuOpen = false;
            this.sidenav.close();
            console.log('Menu closed');
        }
    }

    updateLinks() {
        console.log('Updating links based on admin status...');
        if (this.isAdmin) {
            this.links = [
                { name: 'Home', path: '/', icon: 'home' },
                { name: 'Dashboard', path: '/dashboard', icon: 'list_alt' },
                { name: "Access", path: "/administration", icon : "dashboard" },
                { name: 'Account', path: '/account', icon: 'person' },
                { name: 'Logout', path: '/logout', icon: 'exit_to_app' }
            ];
        } else {
            this.links = [
                { name: 'Home', path: '/', icon: 'home' },
                { name: 'About', path: '#about', icon: 'info_outline' },
                { name: 'Projects', path: '#projects', icon: 'assignment' },
                { name: 'Contact', path: '#contact', icon: 'mail_outline' },
                { name: 'Admin', path: '/register', icon: 'admin_panel_settings' }
            ];
        }
        console.log('Links updated:', this.links);
    }

    navigate(path: string): void {
        console.log('Navigating to:', path);
        this.closeMenu(); // Close the menu regardless of the link clicked
        if (path === '/logout') {
            this.logout(); // Call logout method if the logout link is clicked
            this.router.navigate(['/']); // Optionally redirect to the home page or login page
        } else if (path.startsWith('#')) {
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                console.log('Scrolled to:', path);
            }
        } else {
            this.router.navigate([path]);
            console.log('Router navigated to:', path);
        }
    }

    logout() {
        console.log('Logging out');
        this.authService.logout();
        this.updateAdminStatusAndLinks(); // Ensure admin status is updated on logout
    }
}
