import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  user: User = { username: '', password: '' };
  loading = false;
  error = '';
  success = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';
    if (!this.user.username.trim() || !this.user.password.trim()) {
      this.error = 'Username and password are required.';
      return;
    }
    this.loading = true;
    this.authService.register(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Registration successful! You can now log in.';
        this.user = { username: '', password: '' };
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      },
    });
  }
}
