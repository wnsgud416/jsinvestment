import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { arrayUnion, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
@Component({
  selector: 'app-admin-stock-sell',
  templateUrl: './admin-stock-sell.component.html',
  styleUrls: ['./admin-stock-sell.component.css']
})
export class AdminStockSellComponent implements OnInit {

  completionStock ={}

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminStockSellComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  async ngOnInit(): Promise<void> {
  }

  async sell() {
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + '-' + month + '-' + day
    //const newCityRef = doc(collection(this.firestore, "completionStock",year+"-"+month));

    var array:any = [];
    array.push({
      created_at:this.data.stockData.created_at,
      id: this.data.stockData.id,
      date: year + "-" + month,
      code: this.data.stockData.code,
      name: this.data.stockData.name,
      buyingPrice: this.data.stockData.buyingPrice,
      yield: this.data.stockData.yield,
      sellingPrice: this.data.sellingPrice,
      group: this.data.stockData.group,
      updated_at: dateString
    })

    await updateDoc(doc(this.firestore, "completionStock", year + "-" + month), {
      stock : arrayUnion(...array)
    }).then(() => {

    }).catch(async (error) => {
      await setDoc(doc(this.firestore, "completionStock", year + "-" + month), {
        stock : array
      }).then(() => {
      })
    })

    await deleteDoc(doc(this.firestore, "stockInfo", this.data.stockData.id))
    .then(()=>{
      window.alert('매도를 완료했습니다.')
      this.bottomSheetRef.dismiss()
    }).catch((error) =>{
      window.alert('매도 중에 오류가 발생했습니다.')
    })
  }
  numChange(num) {
    var changeNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return changeNum
  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
