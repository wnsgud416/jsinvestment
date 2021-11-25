import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { deleteDoc, doc } from '@firebase/firestore';

@Component({
  selector: 'app-admin-notice-delete',
  templateUrl: './admin-notice-delete.component.html',
  styleUrls: ['./admin-notice-delete.component.css']
})
export class AdminNoticeDeleteComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminNoticeDeleteComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private firestore: Firestore,
    ) { }

  ngOnInit(): void {
  }

	close() {
    this.bottomSheetRef.dismiss()
  }

  async Delete(){

    await deleteDoc(doc(this.firestore, "notices/public/posts", this.data.id))
    .then(()=>{
      window.alert('공지사항 삭제를 완료했습니다.')
      this.bottomSheetRef.dismiss()
    }).catch((error) =>{
      window.alert('공지사항 삭제중에 오류가 발생했습니다.')
    })

  }
}
