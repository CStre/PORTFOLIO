import { HttpClient } from "@angular/common/http";
import Cat, { ICat } from "../models/cat.model";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})
export default class CatService {

    API_URL = "http://localhost:3000/api/";

    private cats : Cat[] = [];
    private catListener: Subject<Cat[]> = new Subject();

    private currentCat: Cat | undefined;
    private currentCatListener: Subject<Cat | undefined> = new Subject();

    constructor(private http : HttpClient) {}

    addCat(cat : Cat) {
        this.http.post<ICat>(this.API_URL + "cat", cat).subscribe((icat: ICat) => {
            this.cats.push({
                id : icat._id,
                name : icat.name,
                age : icat.age,
                favoriteToy : icat.favoriteToy
            })
            this.catListener.next([...this.cats]);
        })
    }

    getCats(): void {
        this.http.get<ICat[]>(this.API_URL + "cat").subscribe((icats: ICat[]) => {
            this.cats = [];
            icats.forEach((icat: ICat) => {
                this.cats.push({
                    id : icat._id,
                    name : icat.name,
                    age : icat.age,
                    favoriteToy : icat.favoriteToy
                })
            });
            this.catListener.next(this.cats);
        })
    }

    getCat(id: string) {
        this.http.get<{cat?: ICat, message : string}>(this.API_URL + "cat/" + id)
            .subscribe((res: {cat?: ICat, message : string}) => {
                if (res.cat) {
                    this.currentCat = {
                        id : res.cat._id,
                        name : res.cat.name,
                        age : res.cat.age,
                        favoriteToy : res.cat.favoriteToy
                    }
                }
                else {
                    this.currentCat = undefined;
                }
                this.currentCatListener.next(this.currentCat);
            })
    }

    editCat(cat: Cat) {
        this.http.put<{message : string}>(this.API_URL + 'cat/' + cat.id, cat)
            .subscribe((res: {message : string}) => {
                if (res.message === "success") {
                    this.currentCat = cat;
                }
                else {
                    this.currentCat = undefined;
                }
                this.currentCatListener.next(this.currentCat);
            })
    }

    deleteCat(id: string): Observable<{message : string}> {
        return this.http.delete<{message : string}>(this.API_URL + 'cat/' + id);
    }

    getCurrentCat(): Cat | undefined {
        return this.currentCat;
    }

    getCurrentCatListener(): Observable<Cat | undefined> {
        return this.currentCatListener.asObservable();
    }

    getCatListener(): Observable<Cat[]> {
        return this.catListener.asObservable();
    }
}