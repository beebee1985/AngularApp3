import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

/**
 * Main App Component
 * Root component that provides navigation and layout structure
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AngularApp3');

  constructor() {
    console.log('📚 Book Manager Application initialized');
  }
}
