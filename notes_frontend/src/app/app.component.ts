import { Component, inject } from '@angular/core';
import { AuthService } from './core/auth.service';
import { AppBarComponent } from './components/app-bar.component';
import { CategorySidebarComponent } from './components/category-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppBarComponent,
    CategorySidebarComponent,
    RouterOutlet,
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Personal Notes Organizer';
  private auth = inject(AuthService);
  user$ = this.auth.user$;

  onLogout() {
    this.auth.logout();
  }
}
