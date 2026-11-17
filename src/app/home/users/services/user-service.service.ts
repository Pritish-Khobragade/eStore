import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  createUser(user: user): Observable<{ message: string }> {
    const url = 'http://localhost:5001/users/signup';
    return this.http.post<{ message: string }>(url, user);
  }

  login(email: string, password: string): Observable<any> {
    const url: string = 'http://localhost:5001/users/login';
    return this.HttpClient.post(url, {email: email, password: password});

  }
}