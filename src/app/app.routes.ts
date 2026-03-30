import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list';
import { AddBookComponent } from './components/add-book/add-book';

/**
 * Application routes configuration
 * Defines navigation paths for the book management application
 */
export const routes: Routes = [
  // Default route - redirect to book list
  { path: '', redirectTo: '/list', pathMatch: 'full' },

  // Book list route - displays all books
  { path: 'list', component: BookListComponent, title: 'Book Library' },

  // Add book route - form for adding new books
  { path: 'add', component: AddBookComponent, title: 'Add New Book' },

  // Wildcard route - redirect any unknown paths to book list
  { path: '**', redirectTo: '/list' },
];
