import { Component } from "@angular/core";
import CatService from "../services/cat.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'add-cat',
    templateUrl: './add-cat.component.html',
    styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent {

    constructor(
        private catService: CatService,
        private router: Router) {}

    addCat(form : NgForm) {
        this.catService.addCat({
            id : "",
            name: form.value["name"],
            age: form.value["age"],
            favoriteToy: form.value["favoriteToy"]
        });
        this.router.navigate(['/']);
      }
}