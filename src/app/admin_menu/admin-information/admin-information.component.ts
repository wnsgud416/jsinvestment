import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminStockAddComponent } from '../dialog/admin-stock-add/admin-stock-add.component';
import { AdminStockModifyComponent } from '../dialog/admin-stock-modify/admin-stock-modify.component';
import { AdminStockRemoveComponent } from '../dialog/admin-stock-remove/admin-stock-remove.component';
import { collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

export interface PeriodicElement {
	code : string;
	name : string;
	currentPrice : string;
	buyingPrice : string;
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

  displayedColumns: string[] = ['select', 'code', 'name', 'currentPrice', 'buyingPrice', 'yield', 'group', 'sellingPrice', 'action'];
  public tableRowData = new MatTableDataSource([]);

  stockInfoData: any = [];
  GroupData: any = [];
  oneGroupAuth: any = [];
  yieldGroup: any = [];
  manyGroupAuth: any = [];

  quickMenu

   constructor(
     private MatBottomSheet: MatBottomSheet,
     private firestore: Firestore,
			  ) { }

  async ngOnInit(): Promise<void> {

    onSnapshot(
      collection(this.firestore, "stockInfo"), { includeMetadataChanges: true }, (collectionGroupData) => {
        this.stockInfoData = [];
        this.tableRowData = new MatTableDataSource([]);
        collectionGroupData.forEach((doc) => {
          this.stockInfoData.push(doc.data());
        });
        this.stockInfoData.forEach((element,i) => {
          //현재가 찾아서 각자 이름에 적용
          //수익률 계산해서 추가
          this.stockInfoData[i]['currentPrice'] = 0
          this.stockInfoData[i]['yield'] = 0
          this.stockInfoData[i]['sellingPrice'] = 0

        });
        this.tableRowData = new MatTableDataSource(this.stockInfoData);
    });

    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      var group: any = [];
      querySnapshot.forEach((doc) => {
        group.push(doc.data());
      });
      group.forEach(element => {
        this.GroupData.push(element.name);
      });
      // this.GroupData.unshift('전체');
    })
    this.yieldGroup = [this.GroupData[0]]

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

    });

  }

  Stock_Modify(stockData,event) {
    this.MatBottomSheet.open(AdminStockModifyComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData,groupData: this.GroupData,stockInfoData:this.stockInfoData}
    }).afterDismissed().subscribe((result) => {

    });

  }

  Stock_Remove(stockData,event) {
    this.MatBottomSheet.open(AdminStockRemoveComponent, {
      panelClass: 'OptionModal',
      data: {stockData:stockData}
    }).afterDismissed().subscribe((result) => {

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
            if(i ==index){
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
    console.log(this.quickMenu);

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
              if(i ==index){
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





}
