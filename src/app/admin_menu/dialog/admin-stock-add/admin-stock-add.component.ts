import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { collection, getDocs } from 'firebase/firestore';
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
  ) { }

  selectedObjects : any[];
  stockCode;
  stockName;
  buyingPrice;
  GroupData:any = [];

  async ngOnInit(): Promise<void> {
    var group: any=[];
    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        group.push(doc.data());
      });
      group.forEach(element => {
        this.GroupData.push(element.name);
      });
      this.GroupData.unshift('전체');
      this.selectedObjects = [this.GroupData[0]];
    })




  }
  add() {
    console.log(this.stockCode);
    console.log(this.stockName);
    console.log(this.buyingPrice);
    //CMD TEST
    this.store.dispatch(Action.cmdTest())
    this.actions$.pipe(ofType(Action.cmdTestSuccess)).pipe(take(1)).subscribe(async (result) => {
      console.log(result);
      //
      window.alert('주식 종목 추가를 완료했습니다.')
      //this.bottomSheetRef.dismiss()
    });



  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
