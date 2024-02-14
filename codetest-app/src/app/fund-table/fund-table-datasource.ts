import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { DataService } from '../data.service';
import { get } from 'http';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from '../app.component';

// TODO: Replace this with your own data model type
export interface FundTableItem {
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
}[]



// TODO: replace this with real data from your application
const EXAMPLE_DATA: FundTableItem[] = [];


/**
 * Data source for the FundTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FundTableDataSource extends DataSource<FundTableItem> {
  data: FundTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  
  constructor() {
    super();
  }

  setData(data: FundTableItem[]) {
    this.data = data;
    console.log(this.data);
  }
  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FundTableItem[]> {
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
  private getPagedData(data: FundTableItem[]): FundTableItem[] {
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
  private getSortedData(data: FundTableItem[]): FundTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'fundName': return compare(a.fundName, b.fundName, isAsc);
        case 'instrumentId': return compare(+a.instrumentId, +b.instrumentId, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
