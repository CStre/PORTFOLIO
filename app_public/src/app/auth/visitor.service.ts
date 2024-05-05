import { HttpClient } from "@angular/common/http";
import Visitor, { IVisitor } from "../models/visitor.model";
import { Observable, Subject, forkJoin } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})
export default class VisitorService {

    API_URL = "http://localhost:3000/api/";

    private visits : Visitor[] = [];
    private visitListener: Subject<Visitor[]> = new Subject();

    private currentVisit: Visitor | undefined;
    private currentVisitListener: Subject<Visitor | undefined> = new Subject();

    constructor(private http : HttpClient) {}

    addVisit(visit : Visitor) {
        this.http.post<IVisitor>(this.API_URL + "visit", visit).subscribe((ivisit: IVisitor) => {
            this.visits.push({
                id : ivisit._id,
                name : ivisit.name,
                company : ivisit.company,
                email : ivisit.email,
                createdAt: ivisit.createdAt
            })
            this.visitListener.next([...this.visits]);
        })
    }

    getVisits(): void {
      this.http.get<IVisitor[]>(this.API_URL + "visit").subscribe((ivisits: IVisitor[]) => {
          this.visits = ivisits.map((ivisit: IVisitor) => ({
              id: ivisit._id,
              name: ivisit.name,
              company: ivisit.company,
              email: ivisit.email,
              createdAt: ivisit.createdAt  // Ensure this matches the backend data
          }));
          this.visitListener.next(this.visits);
      })
  }


    getVisit(id: string) {
        this.http.get<{visit?: IVisitor, message : string}>(this.API_URL + "visit/" + id)
            .subscribe((res: {visit?: IVisitor, message : string}) => {
                if (res.visit) {
                    this.currentVisit = {
                        id : res.visit._id,
                        name : res.visit.name,
                        company : res.visit.company,
                        email : res.visit.email,
                        createdAt: res.visit.createdAt
                    }
                }
                else {
                    this.currentVisit = undefined;
                }
                this.currentVisitListener.next(this.currentVisit);
            })
    }

    editVisit(visit: Visitor) {
        this.http.put<{message : string}>(this.API_URL + 'visit/' + visit.id, visit)
            .subscribe((res: {message : string}) => {
                if (res.message === "success") {
                    this.currentVisit = visit;
                }
                else {
                    this.currentVisit = undefined;
                }
                this.currentVisitListener.next(this.currentVisit);
            })
    }

    deleteVisits(ids: string[]): Observable<{message: string}[]> {
      // Map each ID to a delete request observable
      const tasks$ = ids.map(id => this.http.delete<{message: string}>(`${this.API_URL}visit/${id}`));

      // Run all delete requests in parallel and return the result
      return forkJoin(tasks$);
  }

    getCurrentVisit(): Visitor | undefined {
        return this.currentVisit;
    }

    getCurrentVisitorListener(): Observable<Visitor | undefined> {
        return this.currentVisitListener.asObservable();
    }

    getVisitListener(): Observable<Visitor[]> {
        return this.visitListener.asObservable();
    }
}
