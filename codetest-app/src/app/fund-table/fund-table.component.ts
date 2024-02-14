import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { FundTableDataSource, FundTableItem } from './fund-table-datasource';
import { DataService } from '../data.service';


@Component({
  selector: 'app-fund-table',
  templateUrl: './fund-table.component.html',
  styleUrl: './fund-table.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  providers: [DataService],
})
export class FundTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FundTableItem>;
  dataSource = new FundTableDataSource();

  constructor(private dataService: DataService) {
    this.dataService.getFunds().subscribe(
      (funds: any[]) => {
        this.dataSource.setData(funds);
        console.log(funds);
      }
    );
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fundName', 'change1m', 'change3m', 'change3y'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
