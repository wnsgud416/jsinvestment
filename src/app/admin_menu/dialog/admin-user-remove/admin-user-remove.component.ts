import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { deleteDoc, doc } from '@firebase/firestore';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AppState } from 'src/app/store';
import * as Action from 'src/app/store/actions/action';

@Component({
  selector: 'app-admin-user-remove',
  templateUrl: './admin-user-remove.component.html',
  styleUrls: ['./admin-user-remove.component.css']
})

export class AdminUserRemoveComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminUserRemoveComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private store: Store<AppState>,
    private actions$: Actions,
    ) { }

    public userName;
    public phone;
    public email;

  ngOnInit(): void {
    this.userName = this.data['name'];
    this.phone = this.data['phone'];
    this.email = this.data['email'];
  }
	close() {
    this.bottomSheetRef.dismiss()
  }
  delete(){
    this.store.dispatch(Action.userDelete({ id:[this.data['id']]}))
    this.actions$.pipe(ofType(Action.userDeleteSuccess)).pipe(take(1)).subscribe(async () => {
      await deleteDoc(doc(this.firestore, "users", this.data['id']))
      .then(()=>{
        window.alert('회원 삭제를 완료했습니다.')
        this.bottomSheetRef.dismiss()
      }).catch((error) =>{
        window.alert('회원 삭제중에 오류가 발생했습니다.')
      })
    });



  }

}
