import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-search',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input 
      type="text"
      class="notes-search-box"
      placeholder="Search notes, tags, categories"
      [(ngModel)]="query"
      (ngModelChange)="onSearch()" />
  `,
  styleUrl: './notes-search.component.css'
})
export class NotesSearchComponent {
  @Output() search = new EventEmitter<string>();
  query = '';

  onSearch() {
    this.search.emit(this.query);
  }
}
