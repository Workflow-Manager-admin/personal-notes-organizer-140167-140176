import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from './note.model';

const STORAGE_KEY = 'notes-db';

function generateId(): string {
  return 'note-' + Date.now() + '-' + Math.floor(Math.random() * 1e8);
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  public notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    this.loadNotes();
  }

  private loadNotes() {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage?.getItem(STORAGE_KEY);
      if (raw) {
        this.notesSubject.next(JSON.parse(raw));
      } else {
        this.notesSubject.next([]);
      }
    }
  }

  private saveNotes(notes: Note[]) {
    if (typeof window !== 'undefined') {
      window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
    this.notesSubject.next(notes);
  }

  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  // PUBLIC_INTERFACE
  createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const newNote: Note = {
      ...note,
      id: generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const notes = [...this.notesSubject.value, newNote];
    this.saveNotes(notes);
    return newNote;
  }

  // PUBLIC_INTERFACE
  updateNote(note: Note): Note {
    const notes = this.notesSubject.value.map(n => n.id === note.id ? {
      ...n, ...note, updatedAt: Date.now()
    } : n);
    this.saveNotes(notes);
    return note;
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): void {
    const notes = this.notesSubject.value.filter(n => n.id !== id);
    this.saveNotes(notes);
  }

  // PUBLIC_INTERFACE
  getAllCategories(): string[] {
    const cats = new Set<string>();
    for (const n of this.notesSubject.value) {
      (n.categories || []).forEach(c => cats.add(c));
    }
    return Array.from(cats).sort();
  }

  // PUBLIC_INTERFACE
  getAllTags(): string[] {
    const tags = new Set<string>();
    for (const n of this.notesSubject.value) {
      (n.tags || []).forEach(t => tags.add(t));
    }
    return Array.from(tags).sort();
  }
}
