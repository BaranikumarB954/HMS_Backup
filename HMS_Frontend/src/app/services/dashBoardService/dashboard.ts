import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

 getMenus() {
  const token = localStorage.getItem('token');
   
  return this.http.get('/api/menu', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  }
}