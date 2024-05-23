import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../email.service';
import Typewriter from 'typewriter-effect/dist/core';

import 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./styling/home.component.css', './styling/home-banner.component.css', './styling/home-about.component.css']
})
export class HomeComponent implements AfterViewInit {
  formSubmitted = false;
  currentImageIndex = 0;
  tabs = ['Education', 'Technology', 'Leadership', 'Professional'];
  selectedTab = this.tabs[0];

  downloadForm = new FormGroup({
    name: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private router: Router,
    private emailService: EmailService
  ) { }

  ngOnInit() { }

  images = [
    { src: "assets/images/1.svg", message: "Earning a Bachelor of Science in Computer Science including a minor in Computer Information Systems in May 2024, demonstrating a robust foundation in both the technical and theoretical as well as the practicle and applied aspects of Computer Science." },
    { src: "assets/images/2.svg", message: "Engaging in a transformative service-abroad program in Costa Rica in 2023, contributing to local community projects and enhancing cultural exchange." },
    { src: "assets/images/3.svg", message: "Representing as an ambassador for my university in international dialogues focused on sustainable development, monoculture practices, and cultural heritage preservation." },
    { src: "assets/images/4.svg", message: "Participating in an additional service initiative in St. John, USVI in 2023, focusing on ecological conservation and community-building efforts alongside the National Park Service" },
    { src: "assets/images/5.svg", message: "Facilitating the orientation and matriculation of over 5,000 students during their transition to university life, serving as a mentor and leader across two consecutive summers." },
    { src: "assets/images/6.svg", message: "Fulfilling the role of Resident Assistant for three years, assuming a myriad of leadership positions within university student housing and significantly enhancing resident life." },
    { src: "assets/images/7.svg", message: "Representng the university at regional and international conferences, advocating for academic excellence and student-led initiatives in a variety of capacities." },
    { src: "assets/images/8.svg", message: "Serving as an executive member of a departmental honorary society, securing numerous accolades at both the university and national levels for leadership and service." },
    { src: "assets/images/9.svg", message: "Collaborating closely with university administration, aiding in strategic initiatives and providing support directly to high-level offices including the Chancellor, Provost, and Dean of Students ." },
    { src: "assets/images/10.svg", message: "Earning a program certificate from the University of Oxford for the complition of an Artificial Intelligence course in July 2023." },
    { src: "assets/images/11.svg", message: "Spearheading program outreach initiatives for World Strides while at Oxford, enhancing educational opportunities and fostering international academic collaborations." },
    { src: "assets/images/12.svg", message: "Being a passionate enthusiast of global travel, eager to immerse myself in diverse cultures, ideologies, and societal structures to broaden my perspective and understanding of the world and my place within it" },
    { src: "assets/images/13.svg", message: "Cultivating a passion for history, architecture, and photography, seeking to capture and appreciate the essence of different eras and aesthetic forms through the lens." },
    { src: "assets/images/14.svg", message: "Valuing unique perspectives and individual experiences, thriving in environments that nurture intellectual engagement, diversity, and the free exchange of ideas." },
  ];

  ngAfterViewInit(): void {
    const typewriter1 = new Typewriter('#typewriter1', {
      loop: true,
      delay: 75,
    });

    typewriter1
      .typeString("Hi, I'm Collin.")
      .pauseFor(5000)
      .start();

    const typewriter2 = new Typewriter('#typewriter2', {
      loop: true,
      delay: 75,
    });

    typewriter2
      .pauseFor(2000) // Adjust this to ensure it starts after the first message
      .typeString('Welcome to my Portfolio!')
      .pauseFor(5000)
      .start();
  }

  onSubmit() {
    if (this.downloadForm.valid) {
      const formValue = this.downloadForm.value;
      console.log("Retrieving Resume");
      this.emailService.sendEmail(formValue.name ?? "", formValue.company ?? "", formValue.email ?? "")
        .subscribe(
          (response) => {
            console.log("Email sent successfully:", response);
            // Call downloadResume() if email is sent successfully or not
            this.downloadResume();
          },
          (error) => {
            console.error("Error sending email:", error);
            this.downloadResume();
          }
        );
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  onMouseMove(event: MouseEvent, img: HTMLImageElement) {
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate angle for X axis (skewX)
    const skewX = (centerX - x) / centerX * - 10; // max skew of 10 degrees
    // Calculate angle for Y axis (skewY)
    const skewY = (centerY - y) / centerY * + 10; // max skew of 10 degrees

    img.style.transform = `perspective(2500px) rotateY(${skewX}deg) rotateX(${skewY}deg)`;
  }

  resetTransform(img: HTMLImageElement) {
    img.style.transform = '';
  }

}
