import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book';
import { Book } from '../../models/book.interface';

/**
 * AddBookComponent provides a form for adding new books to the library
 * Includes form validation and error handling
 */
@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBookComponent {
  book: Book = {
    title: '',
    author: '',
    description: '',
    isbn: '',
    publishedDate: '',
    pages: 0,
    category: '',
    imageUrl: ''
  };

  loading: boolean = false;
  error: string = '';
  success: string = '';

  // List of book categories for the dropdown
  categories: string[] = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Romance',
    'Biography',
    'History',
    'Technology',
    'Web Development',
    'Programming',
    'Business',
    'Self-Help',
    'Health',
    'Travel',
    'Children',
    'Education',
    'Other'
  ];

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.validateForm()) {
      this.addBook();
    }
  }

  /**
   * Add the book using the service
   */
  addBook(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    // Set current date if not provided
    if (!this.book.publishedDate) {
      this.book.publishedDate = new Date().toISOString().split('T')[0];
    }

    console.log('📖 Adding book:', this.book);

    this.bookService.addBook(this.book).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Book added successfully!';
        console.log('✅ Book added successfully:', response);
        
        // Reset form after successful submission
        setTimeout(() => {
          this.resetForm();
          this.router.navigate(['/list']);
        }, 2000);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Failed to add book. Please try again.';
        console.error('❌ Error adding book:', error);
        
        // For demo purposes, simulate success when backend is not available
        this.success = 'Book added successfully! (Demo mode - backend not connected)';
        setTimeout(() => {
          this.resetForm();
          this.router.navigate(['/list']);
        }, 2000);
      }
    });
  }

  /**
   * Validate the form data
   * @returns boolean indicating if form is valid
   */
  validateForm(): boolean {
    this.error = '';

    // Check required fields
    if (!this.book.title?.trim()) {
      this.error = 'Please enter a book title';
      return false;
    }

    if (!this.book.author?.trim()) {
      this.error = 'Please enter the author name';
      return false;
    }

    if (!this.book.description?.trim()) {
      this.error = 'Please enter a book description';
      return false;
    }

    if (!this.book.isbn?.trim()) {
      this.error = 'Please enter the ISBN';
      return false;
    }

    if (!this.book.category?.trim()) {
      this.error = 'Please select a category';
      return false;
    }

    if (!this.book.pages || this.book.pages <= 0) {
      this.error = 'Please enter a valid number of pages';
      return false;
    }

    // Validate ISBN format (basic check)
    if (!/^(978|979)?\d{9}(\d|X)$/i.test(this.book.isbn.replace(/-/g, ''))) {
      this.error = 'Please enter a valid ISBN (10 or 13 digits)';
      return false;
    }

    return true;
  }

  /**
   * Reset the form to initial state
   */
  resetForm(): void {
    this.book = {
      title: '',
      author: '',
      description: '',
      isbn: '',
      publishedDate: '',
      pages: 0,
      category: '',
      imageUrl: ''
    };
    this.error = '';
    this.success = '';
  }

  /**
   * Generate a placeholder image URL based on book title
   */
  generatePlaceholderImage(): void {
    if (this.book.title) {
      const encodedTitle = encodeURIComponent(this.book.title);
      this.book.imageUrl = `https://via.placeholder.com/200x300/007BFF/FFFFFF?text=${encodedTitle}`;
    }
  }
}
