import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
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
  

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {
      "status": {
          "success": true,
          "errors": [],
          "infos": [],
          "jSessionId": "1NUsNSBrbmQGYFKPdEnaK9efK0yjZIjm3iXIeFXp"
      },
      "data": [
          {
              "instrumentId": "9884",
              "isin": "LU0050372472",
              "fundName": "BlackRock GF Euro Bond Fund A2 EUR",
              "fundType": "Aktiefond",
              "estimationDate": 1679868000000,
              "rate": 25.6,
              "change1y": -10.55,
              "currency": "EUR",
              "availableForMonthlySaving": false,
              "redemptionMinFee": {
                  "amount": 100,
                  "currency": "EUR",
                  "empty": false
              },
              "redemptionPercent": null,
              "subscriptionMinFee": {
                  "amount": 100,
                  "currency": "EUR",
                  "empty": false
              },
              "subscriptionPercent": null,
              "subscriptionMinValue": {
                  "amount": 150,
                  "currency": "EUR",
                  "empty": false
              },
              "investmentClass": null,
              "permissions": {
                  "allowedToBuy": true,
                  "allowedToSell": false,
                  "allowedToSwap": false,
                  "allowedForWatchlist": true,
                  "allowedForDetailedInformation": true,
                  "allowedToTrade": true
              },
              "buyCommissions": null,
              "sellCommissions": null,
              "change1m": 1.35,
              "change3m": 1.51,
              "change3y": -11.57,
              "minimumCommission": null,
              "technicalCommission": null,
              "technicalCommissionUp": null,
              "sellCommission": null,
              "administrativeFee": 0.75,
              "startDate": 1564610400000,
              "yearHigh": 26.06,
              "yearLow": 24.94,
              "graphImageLink": null,
              "documents": [
                  {
                      "url": "https://doc.morningstar.com/document/55a4a01bfd568359ddd5557ffd5568eb.msdoc/?clientid=alandsbanken&key=173740fb42c97e8e",
                      "title": "Faktablad"
                  },
                  {
                      "url": "https://www.alandsbanken.se/uploads/pdf/fund/cost_and_charges/LU0050372472_AOS.pdf",
                      "title": "Förhandsinformation om kostnader"
                  }
              ],
              "fundCompany": "BlackRock SA",
              "startValue": 100,
              "closePrice": 25.6,
              "latestClosePriceDate": 1679868000000,
              "countDecimals": 1
          },
          {
              "instrumentId": "9882",
              "isin": "LU0055631609",
              "fundName": "BlackRock Global Funds - World Gold A2 USD",
              "fundType": "Aktiefond",
              "estimationDate": 1679868000000,
              "rate": 34.46,
              "change1y": -17.76,
              "currency": "USD",
              "availableForMonthlySaving": false,
              "redemptionMinFee": {
                  "amount": 0,
                  "currency": "USD",
                  "empty": false
              },
              "redemptionPercent": null,
              "subscriptionMinFee": {
                  "amount": 0,
                  "currency": "USD",
                  "empty": false
              },
              "subscriptionPercent": null,
              "subscriptionMinValue": {
                  "amount": 100,
                  "currency": "USD",
                  "empty": false
              },
              "investmentClass": null,
              "permissions": {
                  "allowedToBuy": true,
                  "allowedToSell": false,
                  "allowedToSwap": false,
                  "allowedForWatchlist": true,
                  "allowedForDetailedInformation": true,
                  "allowedToTrade": true
              },
              "buyCommissions": null,
              "sellCommissions": null,
              "change1m": 13.99,
              "change3m": 8.36,
              "change3y": 23.51,
              "minimumCommission": null,
              "technicalCommission": null,
              "technicalCommissionUp": null,
              "sellCommission": null,
              "administrativeFee": 1.75,
              "startDate": 788742000000,
              "yearHigh": 36.22,
              "yearLow": 30.23,
              "graphImageLink": null,
              "documents": [
                  {
                      "url": null,
                      "title": "Förhandsinformation om kostnader"
                  }
              ],
              "fundCompany": "BlackRock SA",
              "startValue": 0,
              "closePrice": 34.46,
              "latestClosePriceDate": 1679868000000,
              "countDecimals": 1
          }
      ]
  }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  setData(data: DataTableItem[]) {
    this.data = data;
    console.log(this.data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        //case 'fundName': return compare(a.fundName, b.fundName, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
