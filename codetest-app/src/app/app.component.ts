import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, HttpClientModule],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'codetest-app';
  customers: any[] = [];
  apiResponse: any[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getCustomers().subscribe(
      (customers: any[]) => {
        this.customers = customers;
      }
    );
    this.dataService.getFunds().subscribe(
      (apiResponse: any[]) => {
        this.apiResponse = apiResponse;
      }
    );
  }
}
