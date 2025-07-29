import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../core/user.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="appbar">
      <div class="appbar__title">{{ appTitle }}</div>
      <div class="appbar__spacer"></div>
      <ng-container *ngIf="user; else anonymous">
        <div class="appbar__user">
          <span class="appbar__username">{{ user.displayName || user.email }}</span>
          <button class="appbar__logout" (click)="logout.emit()">Logout</button>
        </div>
      </ng-container>
      <ng-template #anonymous>
        <a class="appbar__auth-link" routerLink="/login">Login</a> | <a class="appbar__auth-link" routerLink="/register">Sign Up</a>
      </ng-template>
    </header>
  `,
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent {
  @Input() appTitle = '';
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();
}
