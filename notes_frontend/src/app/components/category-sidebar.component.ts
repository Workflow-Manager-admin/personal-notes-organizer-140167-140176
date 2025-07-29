import { Component } from '@angular/core';
import { NoteService } from '../core/note.service';
import { Router } from '@angular/router';
import { CommonModule, NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule, NgClass, NgForOf],
  template: `
    <nav class="cat-sidebar">
      <div class="cat-sidebar__header">Categories</div>
      <div class="cat-sidebar__list">
        <button 
          class="cat-sidebar__item"
          [ngClass]="{active: selectedCategory === null}" 
          (click)="selectCategory(null)">
          All Notes
        </button>
        <button 
          *ngFor="let cat of categories" 
          class="cat-sidebar__item"
          [ngClass]="{active: selectedCategory === cat}"
          (click)="selectCategory(cat)">
          {{ cat }}
        </button>
      </div>
      <div class="cat-sidebar__header">Tags</div>
      <div class="cat-sidebar__taglist">
        <span 
          *ngFor="let tag of tags"
          class="cat-sidebar__tag"
          [ngClass]="{active: selectedTag === tag}"
          (click)="selectTag(tag)">
          #{{ tag }}
        </span>
      </div>
    </nav>
  `,
  styleUrl: './category-sidebar.component.css'
})
export class CategorySidebarComponent {
  categories: string[] = [];
  tags: string[] = [];
  selectedCategory: string | null = null;
  selectedTag: string | null = null;

  constructor(private notesService: NoteService, private router: Router) {
    this.refresh();
    this.notesService.getNotes().subscribe(() => this.refresh());
  }

  private refresh() {
    this.categories = this.notesService.getAllCategories();
    this.tags = this.notesService.getAllTags();

    const url = this.router.url;
    if (url.startsWith('/notes/category/')) {
      this.selectedCategory = decodeURIComponent(url.replace('/notes/category/', ''));
    } else {
      this.selectedCategory = null;
    }

    if (url.startsWith('/notes/tag/')) {
      this.selectedTag = decodeURIComponent(url.replace('/notes/tag/', ''));
    } else {
      this.selectedTag = null;
    }
  }

  selectCategory(category: string | null) {
    if (category === null) {
      this.router.navigate(['/notes']);
    } else {
      this.router.navigate(['/notes/category', encodeURIComponent(category)]);
    }
  }

  selectTag(tag: string) {
    this.router.navigate(['/notes/tag', encodeURIComponent(tag)]);
  }
}
