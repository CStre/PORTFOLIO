import { Component } from "@angular/core";
import VisitorService from "../services/visitor.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'add-cat',
    templateUrl: './add-cat.component.html',
    styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent {

    constructor(
        private visitorService: VisitorService,
        private router: Router) {}

    addVisitor(form : NgForm) {
        this.visitorService.addVisit({
            id : "",
            name: form.value["name"],
            company: form.value["company"],
            email: form.value["email"]
        });
        this.router.navigate(['/']);
      }
}
