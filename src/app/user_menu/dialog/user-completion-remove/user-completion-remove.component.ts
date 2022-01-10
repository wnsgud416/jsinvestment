import { Component, Inject, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getDoc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-user-completion-remove',
  templateUrl: './user-completion-remove.component.html',
  styleUrls: ['./user-completion-remove.component.css']
})
export class UserCompletionRemoveComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<UserCompletionRemoveComponent>
  ) { }

  selectedObjects : any[];
  stockCode;
  stockName;
  stockInfoData: any = [];
  buyingPrice;
  sellingPrice;
  GroupData:any = [];
  yieldData;
  created_at;
  updated_at;
  docId
  stockId;

  stockArray: any = [];

  ngOnInit(): void {
    this.stockCode = this.data.stockData.code
    this.stockName = this.data.stockData.name
    this.buyingPrice = this.data.stockData.buyingPrice
    this.sellingPrice = this.data.stockData.sellingPrice
    this.created_at = this.data.stockData.created_at
    this.updated_at = this.data.stockData.updated_at
    this.GroupData = this.data.allGroup
    this.selectedObjects = this.data.stockData.group;
    this.yieldData = ((parseInt(this.sellingPrice) / parseInt(this.buyingPrice)) * 100 - 100).toFixed(2) + '%'
    this.docId = this.data.docId
    this.stockId = this.data.stockData.id;

  }

  async deleteStrock() {
    const washingtonRef = doc(this.firestore, "completionStock", this.docId);

    await getDoc(washingtonRef).then(async (docSnap) => {
      var index;
      this.stockArray = docSnap.data();
      this.stockArray['stock'].forEach((element,i) => {
        if (element.id === this.stockId) {
          index = i
        }
      });
      this.stockArray['stock'].splice(index, 1);

      await setDoc(washingtonRef, {
        stock: this.stockArray['stock'],
      })
      .then(()=>{
        window.alert('종목 정보 삭제를 완료했습니다.')
        this.dialogRef.close(this.docId);

      }).catch((error) =>{
        window.alert('종목 정보 삭제중에 오류가 발생했습니다.')
      })
    })

  }

}
