import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import * as Action from 'src/app/store/actions/action';
import { take } from 'rxjs';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-admin-stock-add',
  templateUrl: './admin-stock-add.component.html',
  styleUrls: ['./admin-stock-add.component.css']
})
export class AdminStockAddComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminStockAddComponent>,
    private firestore: Firestore,
    private store: Store<AppState>,
    private actions$: Actions,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  selectedObjects : any[];
  stockCode;
  stockName;
  stockInfoData: any = [];
  buyingPrice;
  currentPrice;
  GroupData:any = [];



  async ngOnInit(): Promise<void> {

    await getDocs(collection(this.firestore, "stockInfo")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.stockInfoData.push(doc.data());
      });
    })

    this.GroupData = this.data.groupData
    this.selectedObjects = [this.GroupData[0]];
  }
  async add() {
    console.log(this.stockCode);
    console.log(this.stockName);
    console.log(this.buyingPrice);

    var same = false;
    this.stockInfoData.forEach(stockInfo => {
      if (stockInfo.name === this.stockName) {
        same = true;
      }
    });
    if (same == false) {
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);

      var dateString = year + '-' + month + '-' + day
      const newCityRef = doc(collection(this.firestore, "stockInfo"));

      var data = {
        created_at:dateString,
        id: newCityRef.id,
        code: this.stockCode,
        name: this.stockName,
        buyingPrice: this.buyingPrice,
        group: this.selectedObjects,
        updated_at: dateString
      }
      await setDoc(newCityRef, data).then(() => {
        window.alert('종목 정보 생성을 완료했습니다.')
        this.bottomSheetRef.dismiss()
      }).catch((error) => {
        window.alert('종목 정보 생성중에 오류가 발생했습니다.');
      })
    } else {
      window.alert('종목 정보중에 같은 종목명이 있습니다.')
    }

    // //CMD TEST
    // this.store.dispatch(Action.cmdTest())
    // this.actions$.pipe(ofType(Action.cmdTestSuccess)).pipe(take(1)).subscribe(async (result) => {
    //   console.log(result);
    //   //
    //   window.alert('주식 종목 추가를 완료했습니다.')
    //   //this.bottomSheetRef.dismiss()
    // });



  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
