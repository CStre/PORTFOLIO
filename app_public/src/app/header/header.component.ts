import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

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
export class HeaderComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMenuOpen = false;
  isHome = true;

  links: Link[] = [
    { name: 'About', path: '#about', icon: 'info_outline' },
    { name: 'Projects', path: '#projects', icon: 'assignment' },
    { name: 'Contact', path: '#contact', icon: 'mail_outline' },
  ];

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

  navigate(path: string): void {
    this.closeMenu();
    const element = document.querySelector(path);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    console.log('Scrolled to:', path);
  }
}
