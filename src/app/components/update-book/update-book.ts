import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-book.html',
  styleUrls: ['./update-book.css'],
})
export class UpdateBookComponent {
  bookId: number | null = null;
  book: Book | null = null;
  message: string = '';

  constructor(private bookService: BookService) {}

  fetchBook() {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe({
        next: (data) => (this.book = data),
        error: () => (this.message = 'Book not found.'),
      });
    }
  }

  updateBook() {
    if (this.book) {
      this.bookService.updateBook(this.book).subscribe({
        next: () => (this.message = 'Book updated successfully!'),
        error: () => (this.message = 'Error updating book.'),
      });
    }
  }
}
