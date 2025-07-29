import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register(this.email).subscribe({
      next: () => {
        this.router.navigate(['/notes']);
      },
      error: () => {
        this.errorMsg = 'Registration failed.';
      }
    });
  }
}
