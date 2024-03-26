import { Component, OnInit } from "@angular/core";
import Cat from "../models/cat.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import CatService from "../services/cat.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-cat',
    templateUrl: './cat.component.html',
    styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {
    loading = true;
    cat : Cat | undefined;
    editing = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private catService: CatService) {}

    ngOnInit() {
        this.catService.getCurrentCatListener().subscribe((cat: Cat | undefined) => {
            if (!cat) {
                this.router.navigate(['/']);
            }
            this.cat = cat;
            this.loading = false;
        })
        this.catService.getCat(this.route.snapshot.params["id"]);
    }

    editCat() {
        this.editing = true;
    }

    updateCat(form: NgForm) {
        this.catService.editCat(this.cat!);
        this.editing = false;
    }

    deleteCat() {
        this.catService.deleteCat(this.cat!.id)
            .subscribe((res: {message : string}) => {
                this.router.navigate(['/']);
            })
    }
}