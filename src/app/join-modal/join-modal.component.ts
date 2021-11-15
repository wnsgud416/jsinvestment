import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
    // Signed in
    const user = userCredential.user;
    await setDoc(doc(this.firestore, "users", user.uid), {
      created_at:user.metadata.creationTime,
      id: user.uid,
      name: null,
      phone: null,
      updated_at: user.metadata.lastSignInTime
    });
    this.bottomSheetRef.dismiss()
    // 회원가입이 완료되었다는 메시지
    window.alert('회원가입이 완료되었습니다.')
    //
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }
	close() {
    this.bottomSheetRef.dismiss()
  }
}
