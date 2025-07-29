import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { 
    path: 'notes', 
    loadChildren: () =>
      import('./notes/notes.routes').then(m => m.NOTES_ROUTES)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '**',
    redirectTo: 'notes'
  }
];
