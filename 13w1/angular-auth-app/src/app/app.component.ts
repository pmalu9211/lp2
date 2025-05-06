import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Import RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Add RouterOutlet to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-auth-app';
}
