import { HttpClient } from "@angular/common/http";
import { Component, Injectable, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable(
    { providedIn : 'root'}
)
export default class CoffeeService {
    public BACKED_URL = "http://localhost:3000/api";

    private coffees: [{name: string}?] = [];

    private coffeeListener: Subject<[{name: string}?]> = new Subject();

    constructor(private http: HttpClient) {}

    getCoffees2(): void {
        this.http.get<[{name: string}?]>(this.BACKED_URL + "/coffees")
            .subscribe((coffees: [{name: string}?]) => {
                this.coffees = coffees;
                this.coffeeListener.next([...this.coffees]);
            })
    }

    getCoffeeListener(): Observable<[{name: string}?]> {
        return this.coffeeListener.asObservable();
    }

    getCoffees(): Observable<[{name: string}?]> {
        return this.http.get<[{name: string}?]>(this.BACKED_URL + "/coffees");
    }
}

@Component({
    template: `<h1 *ngFor="let coffee of coffees">{{coffee.name}}</h1>`,
})
class CoffeeDisplayComponent implements OnInit{

    coffees: [{name : string}?] = [];

    constructor(private coffeeService: CoffeeService) {}

    ngOnInit(): void {
        this.coffeeService.getCoffeeListener()
            .subscribe((coffees: [{name : string}?]) => {
                this.coffees = coffees;
            })
        this.coffeeService.getCoffees2();

        this.coffeeService.getCoffees()
            .subscribe((coffees: [{name : string}?]) => {
            this.coffees = coffees;
        })
    }
}