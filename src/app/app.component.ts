import { Component, OnInit } from '@angular/core';
import { AuthorService } from './core/service/author.service';
import { BookService } from './core/service/book.service';
import { Author } from './core/models/Author';
import { Book } from './core/models/Book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authorList: Author[] = [];
  constructor(
    private authorService: AuthorService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAll().subscribe({
      next: (response) => {
        console.log(response);
        if (response && response.isSuccessful) {
          this.authorList = response.data || [];
          this.authorList.forEach((author) => {
            author.isCollapsed = true;
            this.getBooks(author);
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getBooks(author: Author) {
    this.bookService.get({ id: author.authorBookId || 0 }).subscribe({
      next: (response) => {
        console.log(response);
        if (response && response.isSuccessful) {
          author.books = response.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteAuthorBook(id: number, books: Book[]) {
    this.bookService.delete({ id: id || 0 }).subscribe({
      next: (response) => {
        console.log(response);
        this.getAuthors();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
