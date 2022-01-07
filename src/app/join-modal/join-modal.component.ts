import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.css']
})
export class JoinModalComponent implements OnInit {


  public IDText: any;
  public PasswordText: any;
  public PasswordCheck: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<JoinModalComponent>,
    private firestore: Firestore
    ) { }
  hide = true;
  ngOnInit(): void {
  }

  join(userId, password ){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userId, password)
  .then(async (userCredential) => {
    sendEmailVerification (userCredential.user).then(async ()=>{
      window.alert('이메일에서 승인하면 회원가입이 완료됩니다.')
          // Signed in
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);

      var dateString = year + '-' + month  + '-' + day
      const user = userCredential.user;
      await setDoc(doc(this.firestore, "users", user.uid), {
        created_at:dateString,
        id: user.uid,
        email: user.email,
        group: "일반회원",
        name: "null",
        phone: "null",
        notification_onoff: false,
        notification_token: "",
        updated_at: '신규회원'
      });
      this.bottomSheetRef.dismiss()
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    window.alert('회원가입중에 오류가 발생했습니다.')
  });
  }
	close() {
    this.bottomSheetRef.dismiss()
  }
}
