import { Component, OnInit } from '@angular/core';
import { Note, } from '../core/note.model';
import { NoteService } from '../core/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface NoteFormData {
  title: string;
  content: string;
  categories: string;
  tags: string;
}

@Component({
  selector: 'app-note-editor-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note-editor-modal.component.html',
  styleUrl: './note-editor-modal.component.css'
})
export class NoteEditorModalComponent implements OnInit {
  isNew = false;
  noteId: string | null = null;
  form: NoteFormData = {
    title: '',
    content: '',
    categories: '',
    tags: ''
  };

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.noteId = this.route.snapshot.params['id'] ?? null;
    if (!this.noteId || this.noteId === 'new') {
      this.isNew = true;
    } else {
      const found = (this.noteService as any).notesSubject.value.find((n: Note) => n.id === this.noteId);
      if (found) {
        this.form = {
          title: found.title,
          content: found.content,
          categories: (found.categories || []).join(', '),
          tags: (found.tags || []).join(', ')
        };
      }
    }
  }

  onSubmit() {
    const trimmedData = {
      ...this.form,
      title: this.form.title.trim(),
      content: this.form.content.trim(),
      categories: this.form.categories.split(',').map(c => c.trim()).filter(Boolean),
      tags: this.form.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    if (this.isNew) {
      this.noteService.createNote({
        title: trimmedData.title,
        content: trimmedData.content,
        categories: trimmedData.categories,
        tags: trimmedData.tags
      });
    } else if (this.noteId) {
      this.noteService.updateNote({
        id: this.noteId,
        title: trimmedData.title,
        content: trimmedData.content,
        categories: trimmedData.categories,
        tags: trimmedData.tags,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
    this.router.navigate(['/notes']);
  }

  onCancel() {
    this.router.navigate(['/notes']);
  }
}
