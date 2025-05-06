import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For directives like *ngIf
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { Router, RouterLink } from '@angular/router'; // Import Router and RouterLink

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add RouterLink here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  loginError: boolean = false; // Flag to show error message

  constructor(private router: Router) { }

  // Simple login logic (no backend)
  login(): void {
    // In a real application, you would send this data to a backend API for validation
    console.log('Attempting login for user:', this.user);

    // Simulate a basic check (e.g., hardcoded credentials)
    // Added .trim() to handle potential leading/trailing spaces
    if (this.user.username.trim() === 'test' && this.user.password.trim() === 'password') {
      console.log('Login successful!');
      this.loginError = false;
      // Redirect to the profile page on successful login
      this.router.navigate(['/profile']);
    } else {
      console.log('Login failed!');
      this.loginError = true;
    }
  }
}
