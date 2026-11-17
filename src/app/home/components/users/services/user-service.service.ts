import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginToken, user } from '../../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: user): Observable<{ message: string }> {
    const url = 'http://localhost:5001/users/signup';
    return this.httpClient.post<{ message: string }>(url, user);
  }

  login(email: string, password: string): Observable<loginToken> {
    const url: string = 'http://localhost:5001/users/login';
    return this.httpClient.post<loginToken>(url, { email, password });
  }

  activateToken(token: loginToken): void {
    localStorage.setItem('token', token.token);
    localStorage.setItem('expiry', new Date(Date.now() + token.expiresInSeconds * 1000).toISOString());
  }
}

export { UserService as UserServiceService };
