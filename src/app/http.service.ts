import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(path: string, headers?: Object | null): Observable<T> {
    if (headers) {
      return this.http.get<T>(path, headers);
    } else {
      return this.http.get<T>(path);
    }
  }

  post<T>(path: string, body: string, headers?: Object | null): Observable<T> {
    console.log(path);
    if (headers) {
      return this.http.post<T>(path, body, headers);
    } else {
      return this.http.post<T>(path, body);
    }
  }

  put<T>(path: string, body: any, headers?: Object | null): Observable<T> {
    if (headers) {
      return this.http.put<T>(path, body, headers);
    } else {
      return this.http.put<T>(path, body);
    }
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(path);
  }
  
}
