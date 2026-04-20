import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-book.html',
  styleUrls: ['./delete-book.css'],
})
export class DeleteBookComponent {
  bookId: number | null = null;
  message: string = '';

  constructor(private bookService: BookService) {}

  deleteBook() {
    if (this.bookId) {
      this.bookService.deleteBook(this.bookId).subscribe({
        next: () => (this.message = 'Book deleted successfully!'),
        error: () => (this.message = 'Error deleting book.'),
      });
    }
  }
}
