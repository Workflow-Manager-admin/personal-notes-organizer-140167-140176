import { Component, OnInit } from '@angular/core';
import { NoteService } from '../core/note.service';
import { Note } from '../core/note.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesSearchComponent } from './notes-search.component';
import { NoteCardComponent } from './note-card.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, NotesSearchComponent, NoteCardComponent],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css'
})
export class NotesPageComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  categories: string[] = [];
  tags: string[] = [];
  searchTerm = '';
  selectedCategory: string | null = null;
  selectedTag: string | null = null;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.filterNotes();
    });

    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get('category');
      this.selectedTag = params.get('tag');
      this.filterNotes();
    });
  }

  onNoteDelete(note: Note) {
    if (typeof window !== 'undefined' && window.confirm('Delete this note?')) {
      this.noteService.deleteNote(note.id);
    }
  }

  onNewNote() {
    this.router.navigate(['/notes/edit', 'new']);
  }

  onEditNote(note: Note) {
    this.router.navigate(['/notes/edit', note.id]);
  }

  onSearch(val: any) {
    this.searchTerm = typeof val === "string" ? val : '';
    this.filterNotes();
  }

  filterNotes() {
    let filtered = this.notes;
    if (this.selectedCategory) {
      filtered = filtered.filter(n => n.categories.includes(this.selectedCategory as string));
    }
    if (this.selectedTag) {
      filtered = filtered.filter(n => n.tags && n.tags.includes(this.selectedTag as string));
    }
    if (this.searchTerm && this.searchTerm.length > 0) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        n => 
          (n.title && n.title.toLowerCase().includes(term)) ||
          (n.content && n.content.toLowerCase().includes(term)) ||
          (n.tags && n.tags.some(t => t.toLowerCase().includes(term))) ||
          (n.categories && n.categories.some(c => c.toLowerCase().includes(term)))
      );
    }
    this.filteredNotes = filtered.slice().sort((a, b) => b.updatedAt - a.updatedAt);
  }
}
