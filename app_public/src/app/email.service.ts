import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(name: string, company: string, email: string) {
    const body = {
      name,
      company,
      email
    };
    console.log("Sending these results: " + body.name + " " + body.company + " " + body.email);

    return this.http.post('https://us-west1-infra-data-422500-h0.cloudfunctions.net/portfolio-email', body);
  }
}
