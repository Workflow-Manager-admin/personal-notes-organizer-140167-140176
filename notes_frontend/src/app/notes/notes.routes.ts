import { Routes } from '@angular/router';

export const NOTES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./notes-page.component').then(m => m.NotesPageComponent) },
  { path: 'category/:category', loadComponent: () => import('./notes-page.component').then(m => m.NotesPageComponent) },
  { path: 'tag/:tag', loadComponent: () => import('./notes-page.component').then(m => m.NotesPageComponent) },
  { path: 'edit/:id', loadComponent: () => import('./note-editor-modal.component').then(m => m.NoteEditorModalComponent) }
];
