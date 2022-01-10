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
import { UserCompletionModifyComponent } from '../user-completion-modify/user-completion-modify.component';
import { UserCompletionRemoveComponent } from '../user-completion-remove/user-completion-remove.component';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

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
    private dialog: MatDialog,
    private firestore: Firestore,
  ) { }

  displayedColumns: string[] = ['code','name', 'buyingPrice', 'sellingPrice', 'yield', 'Data'];
  public tableRowData = new MatTableDataSource([]);

  GroupData:any = [];
  docId
  totalYield = 0;
  selectGroup
  stockArray:any = [];

  async ngOnInit(): Promise<void> {
    if (this.data.userGroup == '관리자') {
      this.displayedColumns = ['code','name', 'buyingPrice', 'sellingPrice', 'yield', 'Data','Action'];
    }

    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.GroupData.push(doc.data()['name']);
      });
    })
    this.docId = this.data.docId
    this.stockGroupChange(this.data.userGroup)
  }

  numChange(num) {
    var changeNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return changeNum
  }

	close() {
    this.bottomSheetRef.dismiss()
  }
  Stock_Modify(stockData) {
    this.dialog.open(UserCompletionModifyComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData, allGroup:this.GroupData, docId:this.docId}
    }).afterClosed().subscribe(async (result) => {
      var resultArray:any = []
      const washingtonRef = doc(this.firestore, "completionStock", result);
      await getDoc(washingtonRef).then((docSnap) => {
        var stockArray:any = [];
        stockArray = docSnap.data();
        stockArray['stock'].forEach(element => {
          element.group.forEach(groupData => {
            if (groupData === this.selectGroup) {
              resultArray.push(element)
            }
          });
        });
        this.SumYield(resultArray)
        this.tableRowData = new MatTableDataSource(resultArray);
      })


    });

  }

  Stock_Remove(stockData) {
    this.dialog.open(UserCompletionRemoveComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData, docId:this.docId}
    }).afterClosed().subscribe(async (result) => {
      var resultArray:any = []
      const washingtonRef = doc(this.firestore, "completionStock", result);
      await getDoc(washingtonRef).then((docSnap) => {
        var stockArray:any = [];
        stockArray = docSnap.data();
        stockArray['stock'].forEach(element => {
          element.group.forEach(groupData => {
            if (groupData === this.selectGroup) {
              resultArray.push(element)
            }
          });
        });
        this.SumYield(resultArray)
        this.tableRowData = new MatTableDataSource(resultArray);
      })


    });

  }

  SumYield(array) {
    this.totalYield = 0;
    array.forEach(element => {

      this.totalYield+=parseFloat(element.yield)
    });
    this.totalYield.toFixed(2);
  }

  stockGroupChange(group) {
    this.selectGroup = group
    this.stockArray = [];
    this.data.stocks.forEach(stockData => {
      stockData.group.forEach(groupData => {
        if (groupData === group) {
          this.stockArray.push(stockData)
        }
      });
    });
    this.SumYield(this.stockArray)
    this.tableRowData = new MatTableDataSource(this.stockArray);
  }

}

