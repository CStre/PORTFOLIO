import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User from "../models/user.model";
import { Observable, Subject, forkJoin } from "rxjs";

@Injectable({
  'providedIn': 'root'
})
export default class AuthService {
  API_URL = "https://infra-data-422500-h0.ew.r.appspot.com/api/user/";
  TOKEN_KEY = "token";

  user: User | null = null;
  userListener: Subject<User | null> = new Subject();

  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient) {
    console.log("AuthService initialized");
    this.autoLogIn();
  }

  register({ user, password }: { user: User, password: string }) {
    console.log("Attempting to register user:", user.email);
    this.http.post<{ token: string, user: User } | { error: any }>(this.API_URL + "register", {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      password
    }).subscribe((response) => {
      if ("error" in response) {
        console.error("Registration failed:", response.error);
      }
      else {
        const token = response.token;
        const isAdmin = response.user.isAdmin;
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem("admin", JSON.stringify(isAdmin));
        this.user = response.user;
        this.userListener.next(this.user);
        console.log("User registered successfully:", this.user);
      }
    });
  }

  login({ email, password }: { email: string, password: string }) {
    console.log("Attempting to log in user:", email);
    this.http.post<{ token: string, user: User } | { error: any }>(this.API_URL + "login", {
      email,
      password,
    }).subscribe((response) => {
      if ("error" in response) {
        console.error("Login failed:", response.error);
      }
      else {
        const token = response.token;
        const isAdmin = response.user.isAdmin;
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem("admin", JSON.stringify(isAdmin));
        this.user = response.user;
        this.userListener.next(this.user);
        console.log("Login successful, user details:", this.user);
      }
    })
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  isAdmin(): boolean {
    return this.user?.isAdmin === true;
  }

  getUser(): User | null {
    return this.user;
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}users/${user._id}`, user);
  }


  deleteUser(userId: string): Observable<any> {
      return this.http.delete(`${this.API_URL}users/${userId}`);
  }

  getUserListener(): Observable<User | null> {
    return this.userListener.asObservable();
  }

  updateUsers(users: User[]): void {
    this.usersUpdated.next(users);
  }

  getUserListener2(): Observable<User[]> {
    return this.usersUpdated.asObservable();
  }

  @Injectable({
    providedIn: 'root'
  })

  makeAdmin(ids: string[]): Observable<any> {
    return forkJoin(ids.map(id => this.http.patch(`${this.API_URL}users/${id}`, { isAdmin: true })));
  }

  revokeAdmin(ids: string[]): Observable<any> {
    return forkJoin(ids.map(id => this.http.patch(`${this.API_URL}users/${id}`, { isAdmin: false })));
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY) ?? "";
}

  deleteUsers(ids: string[]): Observable<any> {
    return forkJoin(ids.map(id => this.http.delete(`${this.API_URL}users/${id}`)));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}users`);
  }

  autoLogIn(): void {
    console.log("Attempting auto-login...");
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log("Here is the token: " + token);
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp);
      console.log("Payload: " + tokenPayload);
      console.log("Expiry Date: " + expirationDate);
      if (new Date().getTime() > expirationDate.getTime()) {
        console.log("Token expired, retrieving user data for:", tokenPayload.email);
      }
      else
      {
        console.log("Token is valid, no need to retrieve user.");
        this.retrieveUser(tokenPayload.email);
      }

    }
  }

  retrieveUser(email: string): void {
    console.log("Retrieving user data for:", email);
    this.http.get<User | null>(`${this.API_URL}${email}`).subscribe(user => {
      if (user) {
        this.user = user;
        this.userListener.next(user);
        console.log("User retrieved successfully:", user);
        const isAdmin = user.isAdmin;
        localStorage.setItem("admin", JSON.stringify(isAdmin));
      } else {
        console.log("No user found for email:", email);
      }
    });
  }

  logout() {
    console.log("Logging out user:", this.user?.email);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("admin");
    this.user = null;
    this.userListener.next(null);
    console.log("Logout successful.");
  }
}
