import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl1 = 'http://localhost:8080/customer/all';
  private apiUrl2 = 'https://ivarpivar.netlify.app/api';
  constructor(private http: HttpClient) { }
  getCustomers() {
    return this.http.get<any[]>(this.apiUrl1);
  }

  getFunds() {
    return this.http.get<any[]>(this.apiUrl2);
  }
}
