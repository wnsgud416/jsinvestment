import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-admin-stock-modify',
  templateUrl: './admin-stock-modify.component.html',
  styleUrls: ['./admin-stock-modify.component.css']
})
export class AdminStockModifyComponent implements OnInit {



	groupModel : any[];

  stockCode;
  stockName;
  currentPrice
  buyingPrice;
  yield;
  sellingPrice;
  buyingDate;
  GroupData: any = [];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminStockModifyComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.stockCode = this.data.stockData.code
    this.stockName = this.data.stockData.name
    this.currentPrice = this.data.stockData.currentPrice
    this.buyingPrice = this.data.stockData.buyingPrice
    this.yield = this.data.stockData.yield
    this.GroupData = this.data.GroupData
    this.groupModel = this.data.stockData.group;
    this.sellingPrice = this.data.stockData.sellingPrice
    this.buyingDate = this.data.stockData.created_at

  }

  async save() {
    var same = false;
    this.data.stockInfoData.forEach(stockInfo => {
      if (this.data.stockData.name === this.stockName) {
        same = false;
      } else {
        if (stockInfo.name === this.stockName) {
          same = true;
        }
      }

    });
    if (same == false) {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateTimeString = year + '-' + month + '-' + day;

      const washingtonRef = doc(this.firestore, "stockInfo", this.data.stockData.id);

      await updateDoc(washingtonRef, {
        code: this.stockCode,
        name: this.stockName,
        buyingPrice: this.buyingPrice,
        group: this.groupModel,
        updated_at: dateTimeString,
        created_at: this.buyingDate

      })
        .then(() => {
          window.alert('종목 정보 수정을 완료했습니다.')
          this.bottomSheetRef.dismiss()
        }).catch((error) => {
          window.alert('종목 정보 수정중에 오류가 발생했습니다.')
        })
    } else {
      window.alert('종목 정보중에 같은 종목명이 있습니다.')
    }

  }

	close() {
    this.bottomSheetRef.dismiss()
  }


}
