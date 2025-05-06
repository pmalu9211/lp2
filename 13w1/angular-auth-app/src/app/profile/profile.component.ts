import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For directives like *ngIf
import { Router } from '@angular/router'; // To navigate for logout

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule], // Import necessary modules
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // In a real app, you would fetch the logged-in user's data here
  loggedInUser: string = 'Test User'; // Simulate a logged-in user

  constructor(private router: Router) { }

  // Simple logout logic (no backend)
  logout(): void {
    console.log('Logging out user...');
    // In a real app, you would clear authentication tokens/session here
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
