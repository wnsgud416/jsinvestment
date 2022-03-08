import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminStockAddComponent } from '../dialog/admin-stock-add/admin-stock-add.component';
import { AdminStockModifyComponent } from '../dialog/admin-stock-modify/admin-stock-modify.component';
import { AdminStockRemoveComponent } from '../dialog/admin-stock-remove/admin-stock-remove.component';
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { AdminStockSellComponent } from '../dialog/admin-stock-sell/admin-stock-sell.component';
import { Firestore } from '@angular/fire/firestore';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as Action from 'src/app/store/actions/action';
import { take } from 'rxjs';
import * as $ from 'jquery';

export interface PeriodicElement {
	code : string;
	name : string;
	currentPrice : string;
  buyingPrice: string;
  created_at: string;
	yield : number;
	group : string;
  sellingPrice: string;

  id: string;
}

@Component({
  selector: 'app-admin-information',
  templateUrl: './admin-information.component.html',
  styleUrls: ['./admin-information.component.css']
})
export class AdminInformationComponent implements OnInit {

  displayedColumns: string[] = ['select', 'code', 'name', 'currentPrice', 'buyingPrice','created_at', 'yield', 'group', 'sellingPrice', 'action'];
  public tableRowData = new MatTableDataSource([]);

  stockInfoData: any = [];
  GroupData: any = [];
  oneGroupAuth: any = [];
  yieldGroup: any = [];
  manyGroupAuth: any = [];

  quickMenu
  allYield;
  interval
  reflashValue;

  isLoading = true;
   constructor(
     private MatBottomSheet: MatBottomSheet,
     private firestore: Firestore,
     private store: Store<AppState>,
     private actions$: Actions,
			  ) { }

  async ngOnInit(): Promise<void> {
    await getDoc(doc(this.firestore, "admin", "reflashStock")).then(async (docData) => {
      var docValue :any = docData.data()
      this.reflashValue = parseInt(docValue['value'])*1000

    });

    this.getStock();

    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      var group: any = [];
      querySnapshot.forEach((doc) => {
        group.push(doc.data());
      });
      group.forEach(element => {
        if (element.name != '관리자') {
          this.GroupData.push(element.name);
        }
      });
      // this.GroupData.unshift('전체');
    })
    this.yieldGroup = [this.GroupData[0]]
  }

  numChange(num) {
    var changeNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return changeNum
  }

  //dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableRowData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableRowData.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.code + 1}`;
  }

  Stock_Add() {
    this.MatBottomSheet.open(AdminStockAddComponent, {
      panelClass: 'OptionModal',
      data: {groupData: this.GroupData}
    }).afterDismissed().subscribe((result) => {
      this.selection.clear();
      this.getStock()
    });

  }

  Stock_Modify(stockData,event) {
    this.MatBottomSheet.open(AdminStockModifyComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData,GroupData: this.GroupData,stockInfoData:this.stockInfoData}
    }).afterDismissed().subscribe((result) => {
      this.selection.clear();
      this.getStock()
    });

  }

  Stock_Remove(stockData,event) {
    this.MatBottomSheet.open(AdminStockRemoveComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData}
    }).afterDismissed().subscribe((result) => {
      this.selection.clear();
      this.getStock()
    });

  }
  Stock_Sell(stockData, event, sellValue) {
    this.MatBottomSheet.open(AdminStockSellComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData, sellingPrice:sellValue.value}
    }).afterDismissed().subscribe((result) => {
      this.selection.clear();
      this.getStock()
    });
  }
  manyGroupAuthClick() {
    if (this.selection.selected.length == 0) {
      window.alert('이동 할 종목을 선택해 주세요.')
    } else {
      if (this.manyGroupAuth.length == 0) {
        window.alert('이동 할 권한을 선택해 주세요.')
      } else {
        var index = this.selection.selected.length - 1
        this.selection.selected.forEach(async (data,i)=>{
          const washingtonRef = doc(this.firestore, "stockInfo", data.id);

          await updateDoc(washingtonRef, {
            group: this.manyGroupAuth,
          })
          .then(()=>{
            if (i == index) {
              this.getStock()
              window.alert('그룹 수정을 완료했습니다.')
              this.selection.clear();

            }
          }).catch((error) =>{
            window.alert('그룹 수정중에 오류가 발생했습니다.')
          })
        })
      }
    }

  }

  quickMenuClick() {

    if (this.selection.selected.length == 0) {
      window.alert('이동할 종목을 선택해 주세요.')
    } else {
      if (this.quickMenu === undefined) {
        window.alert('실행할 기능을 선택해 주세요.')
      } else {
        if (this.quickMenu === 'stockDelete') {
          var index = this.selection.selected.length - 1
          this.selection.selected.forEach(async (data,i)=>{
            await deleteDoc(doc(this.firestore, "stockInfo", data.id))
            .then(()=>{
              if (i == index) {
                this.getStock()
                window.alert('그룹 삭제를 완료했습니다.')
                this.selection.clear();
              }
            }).catch((error) =>{
              window.alert('그룹 삭제중에 오류가 발생했습니다.')
            })
          })
        }
      }
    }

  }


  async getStock() {
    this.isLoading = true;
    this.yieldGroup = [];
    await getDocs(collection(this.firestore, "stockInfo")).then(async (collectionGroupData) => {
      this.stockInfoData = [];
        this.tableRowData = new MatTableDataSource([]);
        collectionGroupData.forEach((doc) => {
          this.stockInfoData.push(doc.data());
        });
      this.stockInfoData.sort((a, b) => b.created_at.localeCompare(a.created_at));

        var stockCodeArray:any = [];
        this.stockInfoData.forEach((element,i) => {
          stockCodeArray.push(element.code)
        });

        await this.getStockInfo(stockCodeArray)
        this.interval = setInterval(async () => {
          await this.getStockInfo(stockCodeArray)
        }, this.reflashValue);

    })
  }

getStockInfo(stockCodeArray) {
  var stockCurrentPrice
    this.store.dispatch(Action.cmdTest({ stockCodeArray:stockCodeArray}))
    this.actions$.pipe(ofType(Action.cmdTestSuccess)).pipe(take(1)).subscribe((result) => {
      stockCurrentPrice = JSON.parse(result.result)

      var SumYield = 0;
      this.stockInfoData.forEach((element,i) => {
        //현재가 찾아서 각자 이름에 적용
        //수익률 계산해서 추가
        var currentPrice;
        var yieldData;
        stockCurrentPrice.forEach((stockData,j) => {
          if(stockData.stockCode ===element.code){
            currentPrice =stockData.currentPrice
          }
        });
        yieldData = ((parseInt(currentPrice)/parseInt(element.buyingPrice))*100-100)
        SumYield += yieldData;
        this.stockInfoData[i]['currentPrice'] = currentPrice
        this.stockInfoData[i]['yield'] = yieldData.toFixed(2)
        this.stockInfoData[i]['sellingPrice'] = "0"
      });

      $({ val : 0 }).animate({ val : SumYield }, {
        duration: 3000,
        step: function() {
        var num = numberWithCommas(this.val);
        if(num > 0){
            $(".User_Total_Value").val(num);
            $(".User_Total_Value").removeClass("MinusNumber");
            $(".User_Total_Value").addClass("PlusNumber");
            }
          else{
            $(".User_Total_Value").val(num);
            $(".User_Total_Value").removeClass("PlusNumber");
            $(".User_Total_Value").addClass("MinusNumber");
          }
        },
        complete: function() {
        var num = numberWithCommas(this.val);
            $(".User_Total_Value").val(num);
        }
      });

      function numberWithCommas(x) {
            return x.toFixed(2);
      }

      this.tableRowData = new MatTableDataSource(this.stockInfoData);
      this.isLoading = false;
    });
    this.actions$.pipe(ofType(Action.cmdTestFail)).pipe(take(1)).subscribe(async (result) => {
      this.stockInfoData.forEach((element,i) => {
        this.stockInfoData[i]['currentPrice'] = "0"
        this.stockInfoData[i]['yield'] = "0"
        this.stockInfoData[i]['sellingPrice'] = "0"
      });
      this.tableRowData = new MatTableDataSource(this.stockInfoData);
    });
}
  yieldGroupSelect(group) {
    var stockInfoData_group: any = [];
    this.stockInfoData.forEach((stockData) => {
      stockData.group.forEach(groupData => {
        if (groupData === group) {
          stockInfoData_group.push(stockData)
        }
      });
    })
    this.stockInfoData = stockInfoData_group
    this.tableRowData = new MatTableDataSource(stockInfoData_group);
}

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }

  }
}
