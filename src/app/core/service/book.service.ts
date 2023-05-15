import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { CommonService } from './CommonService';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService extends CommonService<Book> {
  constructor(http: HttpClient) {
    super(http, environment.PATH_BOOKS);
  }
}
