import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book.interface';

/**
 * BookListComponent displays all books in a list format
 * Provides functionality to view and delete books
 */
@Component({
  selector: 'app-book-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private bookService: BookService) {}

  /**
   * Initialize component and load books
   */
  ngOnInit(): void {
    this.loadBooks();
  }

  /**
   * Load all books from the service
   */
  loadBooks(): void {
    this.loading = true;
    this.error = '';

    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
        console.log('📚 Books loaded successfully:', books);
      },
      error: (error) => {
        this.error = 'Failed to load books. Please try again later.';
        this.loading = false;
        console.error('Error loading books:', error);

        // For demo purposes, provide some sample data if backend is not available
        this.books = this.getSampleBooks();
      },
    });
  }

  /**
   * Delete a book by ID
   * @param id Book ID to delete
   */
  deleteBook(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter((book) => book.id !== id);
          console.log('📖 Book deleted successfully');
        },
        error: (error) => {
          this.error = 'Failed to delete book. Please try again.';
          console.error('Error deleting book:', error);
        },
      });
    }
  }

  /**
   * Get sample books for demo purposes when backend is unavailable
   * @returns Array of sample books
   */
  private getSampleBooks(): Book[] {
    return [
      {
        id: 1,
        title: 'Angular: The Complete Guide',
        author: 'Maximilian Schwarzmüller',
        description:
          'Master Angular and build awesome, reactive web apps with the successor of Angular.js',
        isbn: '978-1234567890',
        publishedDate: '2023-01-15',
        pages: 680,
        category: 'Web Development',
        imageUrl: 'https://via.placeholder.com/200x300/007BFF/FFFFFF?text=Angular+Guide',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'TypeScript Deep Dive',
        author: 'Basarat Ali Syed',
        description:
          'A comprehensive guide to TypeScript for building better JavaScript applications',
        isbn: '978-0987654321',
        publishedDate: '2022-11-20',
        pages: 450,
        category: 'Programming',
        imageUrl: 'https://via.placeholder.com/200x300/28A745/FFFFFF?text=TypeScript',
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Learning RxJS',
        author: 'Thomas Reardon',
        description: 'Reactive Extensions for JavaScript - Build asynchronous applications',
        isbn: '978-1122334455',
        publishedDate: '2023-03-10',
        pages: 320,
        category: 'JavaScript',
        imageUrl: 'https://via.placeholder.com/200x300/DC3545/FFFFFF?text=RxJS',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
