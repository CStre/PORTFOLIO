import { Component, OnInit } from '@angular/core';
import CatService from '../services/cat.service';
import Cat from '../models/cat.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  cats : Cat[] = [];

  constructor(private catService : CatService) {}

  ngOnInit() {
    this.catService.getCatListener().subscribe((cats : Cat[]) => {
      this.cats = cats;
    });
    this.catService.getCats();
  }
}
