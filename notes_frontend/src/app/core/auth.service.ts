import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public readonly user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      const session = window.localStorage?.getItem('notes-user');
      if (session) {
        this.userSubject.next(JSON.parse(session));
      }
    }
  }

  // PUBLIC_INTERFACE
  login(email: string): Observable<User> {
    const user: User = { id: 'local-uid', email, displayName: null };
    if (typeof window !== 'undefined') {
      window.localStorage?.setItem('notes-user', JSON.stringify(user));
    }
    this.userSubject.next(user);
    return of(user);
  }

  // PUBLIC_INTERFACE
  register(email: string): Observable<User> {
    const user: User = { id: 'local-uid', email, displayName: null };
    if (typeof window !== 'undefined') {
      window.localStorage?.setItem('notes-user', JSON.stringify(user));
    }
    this.userSubject.next(user);
    return of(user);
  }

  // PUBLIC_INTERFACE
  logout(): void {
    if (typeof window !== 'undefined') {
      window.localStorage?.removeItem('notes-user');
    }
    this.userSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}
