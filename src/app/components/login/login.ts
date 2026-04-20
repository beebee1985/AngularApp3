import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  user: User = { username: '', password: '' };
  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';
    if (!this.user.username.trim() || !this.user.password.trim()) {
      this.error = 'Username and password are required.';
      return;
    }
    this.loading = true;
    this.authService.login(this.user).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = 'Login successful!';
        // Optionally store token/session here
        setTimeout(() => this.router.navigate(['/list']), 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      },
    });
  }
}
