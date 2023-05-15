import { Injectable } from '@angular/core';
import { CommonService } from './CommonService';
import { Author } from '../models/Author';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService extends CommonService<Author> {
  constructor(http: HttpClient) {
    super(http, environment.PATH_AUTHORS);
  }
}
