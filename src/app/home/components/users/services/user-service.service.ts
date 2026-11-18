import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, Subscription, timer } from 'rxjs';
import { loginToken, user, loggedInUser } from '../../../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedInUserInfo: BehaviorSubject<loggedInUser> = new BehaviorSubject(<loggedInUser>{});
  private readonly isBrowser: boolean;
  private logoutTimer?: Subscription;
  
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (!this.isBrowser) {
      return;
    }

    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    const firstName = localStorage.getItem('firstName');
    const expiryTime = expiry ? Date.parse(expiry) : NaN;

    if (token && Number.isFinite(expiryTime) && expiryTime > Date.now() && firstName && firstName !== 'undefined') {
      this.isAuthenticated.next(true);
      this.loggedInUserInfo.next({
        firstName,
        lastName: localStorage.getItem('lastname') ?? '',
        address: localStorage.getItem('address') ?? '',
        city: localStorage.getItem('city') ?? '',
        state: localStorage.getItem('state') ?? '',
        pin: localStorage.getItem('pin') ?? ''
      });
      this.scheduleAutoLogout(expiryTime);
    } else if (token && expiry && Number.isFinite(expiryTime) && expiryTime <= Date.now()) {
      this.logout();
    }
  }

  get isUserAuthenticated(): boolean {
    return this.isAuthenticated.value;
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  get loggedInUser$(): Observable<loggedInUser> {
    return this.loggedInUserInfo.asObservable();
  }

  createUser(user: user): Observable<{ message: string }> {
    const url = 'http://localhost:5001/users/signup';
    return this.httpClient.post<{ message: string }>(url, user);
  }

  login(email: string, password: string): Observable<loginToken> {
    const url: string = 'http://localhost:5001/users/login';
    return this.httpClient.post<loginToken>(url, { email, password });
  }

  activateToken(token: loginToken): void {
    const expiryTime = Date.now() + token.expiresInSeconds * 1000;
    const userInfo: loggedInUser = {
      ...token.user,
      firstName: token.user.firstName || token.user.fisrtName || ''
    };

    if (this.isBrowser) {
      localStorage.setItem('token', token.token);
      localStorage.setItem('expiry', new Date(expiryTime).toISOString());
      localStorage.setItem('firstName', userInfo.firstName);
      localStorage.setItem('lastname', userInfo.lastName);
      localStorage.setItem('address', userInfo.address);
      localStorage.setItem('city', userInfo.city);
      localStorage.setItem('state', userInfo.state);
      localStorage.setItem('pin', userInfo.pin);
      this.scheduleAutoLogout(expiryTime);
    }

    this.isAuthenticated.next(true);
    this.loggedInUserInfo.next(userInfo);

  }

  private scheduleAutoLogout(expiryTime: number): void {
    this.logoutTimer?.unsubscribe();
    this.logoutTimer = timer(Math.max(0, expiryTime - Date.now())).subscribe(() => this.logout());
  }

  logout(): void {
    this.logoutTimer?.unsubscribe();
    this.logoutTimer = undefined;

    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiry');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastname');
      localStorage.removeItem('address');
      localStorage.removeItem('city');
      localStorage.removeItem('state');
      localStorage.removeItem('pin');
    }

    this.isAuthenticated.next(false);
    this.loggedInUserInfo.next({} as loggedInUser);
  }
}

export { UserService as UserServiceService };
