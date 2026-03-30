import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Book } from '../models/book.interface';

/**
 * BookService handles all HTTP communications with the PHP backend
 * Provides CRUD operations for book management
 */
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost/book-api'; // PHP backend URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Get all books from the backend
   * @returns Observable<Book[]>
   */
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books.php`).pipe(catchError(this.handleError));
  }

  /**
   * Get a single book by ID
   * @param id Book ID
   * @returns Observable<Book>
   */
  getBookById(id: number): Observable<Book> {
    return this.http
      .get<Book>(`${this.apiUrl}/books.php?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Add a new book
   * @param book Book object to add
   * @returns Observable<any>
   */
  addBook(book: Book): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/books.php`, JSON.stringify(book), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Update an existing book
   * @param book Book object to update
   * @returns Observable<any>
   */
  updateBook(book: Book): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/books.php`, JSON.stringify(book), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a book by ID
   * @param id Book ID to delete
   * @returns Observable<any>
   */
  deleteBook(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/books.php?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle HTTP errors
   * @param error Error object
   * @returns Error observable
   */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}
