import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-user-completion-modify',
  templateUrl: './user-completion-modify.component.html',
  styleUrls: ['./user-completion-modify.component.css']
})
export class UserCompletionModifyComponent implements OnInit {

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<UserCompletionModifyComponent>
  ) { }
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

  async subscription(event,type){
    var year = event.getFullYear();
    var month = ('0' + (event.getMonth() + 1)).slice(-2);
    var day = ('0' + event.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day

    if (type === 'created_at') {
      this.created_at = dateString
    } else if (type === 'updated_at') {
      this.updated_at = dateString
    }
  }
  async Save() {
    const washingtonRef = doc(this.firestore, "completionStock", this.docId);

    await getDoc(washingtonRef).then(async (docSnap) => {
      var index;
      this.stockArray = docSnap.data();
      this.stockArray['stock'].forEach((element,i) => {
        if (element.id === this.stockId) {
          index = i
        }
      });

      this.stockArray['stock'][index].buyingPrice = this.buyingPrice
      this.stockArray['stock'][index].code = this.stockCode
      this.stockArray['stock'][index].name = this.stockName
      this.stockArray['stock'][index].sellingPrice = this.sellingPrice
      this.stockArray['stock'][index].created_at = this.created_at
      this.stockArray['stock'][index].updated_at = this.updated_at
      this.stockArray['stock'][index].group = this.selectedObjects
      this.stockArray['stock'][index].yield = this.yieldData.slice(0, -1);

      await setDoc(washingtonRef, {
        stock: this.stockArray['stock'],
      })
      .then(()=>{
        window.alert('종목 정보 수정을 완료했습니다.')
        this.dialogRef.close(this.docId);

      }).catch((error) =>{
        window.alert('종목 정보 수정중에 오류가 발생했습니다.')
      })
    })




  }

}
