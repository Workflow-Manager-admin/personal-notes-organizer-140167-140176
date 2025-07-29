import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../core/note.model';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onEdit() {
    this.edit.emit();
  }
  onDelete() {
    this.delete.emit();
  }
  formatDate(ts: number): string {
    const d = new Date(ts);
    return d.toLocaleString();
  }
}
