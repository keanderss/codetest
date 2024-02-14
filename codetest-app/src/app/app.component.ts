import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, HttpClientModule, DataTableComponent],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  customers: any[] = [];
  apiResponse: ApiResponse[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getCustomers().subscribe(
      (customers: any[]) => {
        this.customers = customers;
      }
    );
    this.dataService.getFunds().subscribe(
      (apiResponse: ApiResponse[]) => {
        this.apiResponse = apiResponse;
      }
    );
  }
}

export interface ApiResponse {
  status: {
    success: boolean;
    errors: [];
    infos: [];
    jSessionId: string;
  }
  data: {
    instrumentId: string,
    isin: string,
    fundName: string,
    fundType: string,
    estimationDate: number,
    rate: number,
    change1y: number,
    currency: string,
    availableForMonthlySaving: boolean,
    redemptionMinFee: {
      amount: number,
      currency: string,
      empty: boolean,
    }
    redemptionPercent: unknown,
    subscriptionMinFee: {
      amount: number,
      currency: string,
      empty: boolean,
    }
    subscriptionPercent: unknown,
    subscriptionMinValue: {
      amount: number,
      currency: string,
      empty: boolean,
    }
    investmentClass: unknown,
    permissions: {
      allowedToBuy: boolean,
      allowedToSell: boolean,
      allowedToSwap: boolean,
      allowedForWatchlist: boolean,
      allowedForDetailedInformation: boolean,
      allowedToTrade: boolean,
    }
    buyCommissions: unknown,
    sellCommissions: unknown,
    change1m: number,
    change3m: number,
    change3y: number,
    minimumCommission: unknown,
    technicalCommission: unknown,
    technicalCommissionUp: unknown,
    sellCommission: unknown,
    administrativeFee: number,
    startDate: number,
    yearHigh: number,
    yearLow: number,
    graphImageLink: unknown,
    documents: { url: string; title: string; }[],
    fundCompany: string,
    startValue: number,
    closePrice: number,
    latestClosePriceDate: number,
    countDecimals: number,
  }[],
}
