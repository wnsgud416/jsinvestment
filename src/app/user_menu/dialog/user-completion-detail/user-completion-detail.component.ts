import {
    AdminStockModifyComponent
} from '../../../admin_menu/dialog/admin-stock-modify/admin-stock-modify.component';
import {
    AdminStockRemoveComponent
} from '../../../admin_menu/dialog/admin-stock-remove/admin-stock-remove.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  code: string;
  name: string;
  buyingPrice: string;
  sellingPrice: string;
  yield: string;
  Data: string;

}

@Component({
  selector: 'app-user-completion-detail',
  templateUrl: './user-completion-detail.component.html',
  styleUrls: ['./user-completion-detail.component.css']
})

export class UserCompletionDetailComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<UserCompletionDetailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['code','name', 'buyingPrice', 'sellingPrice', 'yield', 'Data','Action'];
  public tableRowData = new MatTableDataSource([]);




  ngOnInit(): void {
    console.log(this.data.stocks);

    this.tableRowData = new MatTableDataSource(this.data.stocks);
  }

  numChange(num) {
    var changeNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return changeNum
  }

	close() {
    this.bottomSheetRef.dismiss()
  }
  Stock_Modify(stockData) {
    this.dialog.open(AdminStockModifyComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData}
    }).afterClosed().subscribe((result) => {

    });

  }

  Stock_Remove(stockData) {
    this.dialog.open(AdminStockRemoveComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData}
    }).afterClosed().subscribe((result) => {

    });

  }

}

