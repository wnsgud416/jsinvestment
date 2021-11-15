import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

@Component({
  selector: 'app-find-modal',
  templateUrl: './find-modal.component.html',
  styleUrls: ['./find-modal.component.css']
})
export class FindModalComponent implements OnInit {

  public emailText;
  constructor(private bottomSheetRef: MatBottomSheetRef<FindModalComponent>) { }

  ngOnInit(): void {
  }
	close(){
		this.bottomSheetRef.dismiss()
	}
  passwdFind(emailText){
    const auth = getAuth();
    sendPasswordResetEmail(auth, emailText)
      .then(() => {
        window.alert('이메일을 확인하여 비밀번호를 수정하세요.')
        this.bottomSheetRef.dismiss()
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert('잘못된 이메일입니다.')

      });
  }

}
