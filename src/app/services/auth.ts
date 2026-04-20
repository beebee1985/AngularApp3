import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost/book-api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register.php`, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  login(user: User): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login.php`, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth error:', error);
    return throwError(() => error);
  }
}
