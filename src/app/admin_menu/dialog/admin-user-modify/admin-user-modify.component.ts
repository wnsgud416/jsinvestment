import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-admin-user-modify',
  templateUrl: './admin-user-modify.component.html',
  styleUrls: ['./admin-user-modify.component.css']
})
export class AdminUserModifyComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminUserModifyComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

    public userName;
    public phone;
    public email;

  ngOnInit(): void {
    console.log(this.data);
    this.userName = this.data['name'];
    this.phone = this.data['phone'];
    this.email = this.data['email'];
  }
	close() {
    this.bottomSheetRef.dismiss()
  }

  async save(){
    const washingtonRef = doc(this.firestore, "users", this.data['id']);

    await updateDoc(washingtonRef, {
      name: this.userName,
      phone: this.phone
    })
    .then(()=>{
      window.alert('회원 정보 수정을 완료했습니다.')
      this.bottomSheetRef.dismiss()
      window.location.reload()
    }).catch((error) =>{
      window.alert('회원 정보 수정중에 오류가 발생했습니다.')
    })
  }
}
