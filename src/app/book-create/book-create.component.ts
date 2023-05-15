import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from '../core/service/book.service';
import { Book } from '../core/models/Book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css'],
})
export class BookCreateComponent {
  createBookModel: Book = {};
  @Output() getAuthorsMethod = new EventEmitter<void>();
  @Input() authorId?: number;

  closeResult = '';

  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        () => {}
      );
  }

  createBook() {
    this.createBookModel.authorBookId = this.authorId;
    console.log(this.createBookModel);
    this.bookService.create({ entity: this.createBookModel }).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.getAuthorsMethod.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
