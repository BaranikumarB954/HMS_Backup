import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getMenus(): Observable<any> {
    return this.http.get('/api/menu', {
      withCredentials: true
    });
  }

}