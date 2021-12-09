import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { deleteDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-admin-stock-remove',
  templateUrl: './admin-stock-remove.component.html',
  styleUrls: ['./admin-stock-remove.component.css']
})
export class AdminStockRemoveComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AdminStockRemoveComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    console.log(this.data.stockData);

  }

  async deleteStock() {
    await deleteDoc(doc(this.firestore, "stockInfo", this.data.stockData.id))
    .then(()=>{
      window.alert('종목 정보 삭제를 완료했습니다.')
      this.bottomSheetRef.dismiss()
    }).catch((error) =>{
      window.alert('종목 정보 삭제중에 오류가 발생했습니다.')
    })
  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
