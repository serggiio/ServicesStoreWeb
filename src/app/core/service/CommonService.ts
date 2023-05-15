import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environment/environment';
import { ApiResult } from '../models/ApiResult';

export class CommonService<T> {
  urlPath: string;

  constructor(private _http: HttpClient, urlPath: string) {
    this.urlPath = `${environment.URL}${urlPath}`;
  }

  public get http(): HttpClient {
    return this._http;
  }

  create(params: { entity: T }): Observable<T> {
    return this.http.post<T>(`${this.urlPath}`, params.entity);
  }

  getAll(params?: { uri?: string }): Observable<ApiResult<T>> {
    return this.http.get<ApiResult<T>>(`${this.urlPath}`, {
      params,
    });
  }

  delete(params: { id: number }): Observable<T> {
    return this.http.delete<T>(`${this.urlPath}/${params.id}`);
  }

  get(params: { id: number }): Observable<ApiResult<T>> {
    return this.http.get<ApiResult<T>>(`${this.urlPath}/${params.id}`);
  }
}
