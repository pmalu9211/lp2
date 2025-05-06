import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For directives like *ngIf
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { Router, RouterLink } from '@angular/router'; // Import Router and RouterLink

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add RouterLink here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    password: ''
  };
  registrationSuccess: boolean = false; // Flag to show success message

  constructor(private router: Router) { }

  // Simple registration logic (no backend)
  register(): void {
    // In a real application, you would send this data to a backend API
    console.log('Registering user:', this.user);

    // Simulate successful registration
    this.registrationSuccess = true;

    // Optionally, redirect to login after a short delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); // Redirect after 2 seconds
  }
}
