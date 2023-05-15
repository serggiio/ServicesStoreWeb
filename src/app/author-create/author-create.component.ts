import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Author } from '../core/models/Author';
import { AuthorService } from '../core/service/author.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.css'],
})
export class AuthorCreateComponent {
  createAuthorModel: Author = {
    isCollapsed: false,
  };
  @ViewChild('createForm', { static: false })
  createAuthorForm: FormControl | undefined;

  @Output() getAuthorsMethod = new EventEmitter<void>();

  closeResult = '';

  constructor(
    private authorService: AuthorService,
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

  createAuthor() {
    console.log(this.createAuthorForm?.valid);
    this.authorService.create({ entity: this.createAuthorModel }).subscribe({
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
