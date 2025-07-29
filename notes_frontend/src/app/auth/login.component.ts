import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.email).subscribe({
      next: () => {
        this.router.navigate(['/notes']);
      },
      error: () => {
        this.errorMsg = 'Login failed';
      }
    });
  }
}
