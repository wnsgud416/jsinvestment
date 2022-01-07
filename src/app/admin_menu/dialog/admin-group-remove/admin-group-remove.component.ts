import { Component, Inject, OnInit } from '@angular/core';
import { collection, deleteDoc, Firestore, getDocs } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-admin-group-remove',
  templateUrl: './admin-group-remove.component.html',
  styleUrls: ['./admin-group-remove.component.css']
})
export class AdminGroupRemoveComponent implements OnInit {

 constructor(private bottomSheetRef: MatBottomSheetRef<AdminGroupRemoveComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }
  ngOnInit(): void {

  }

	close() {
    this.bottomSheetRef.dismiss()
  }
  async delete() {
    var action = false
    await getDocs(collection(this.firestore, 'users')).then(async (collection) => {
      collection.forEach(async (docs) => {
        var docData:any = docs.data()
        if (docData.group === this.data.group.name) {
          action = true;
          var today = new Date();
          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2);
          var day = ('0' + today.getDate()).slice(-2);

          var dateString = year + '-' + month + '-' + day
          const newCityRef = doc(this.firestore, "users",docData.id);

          await updateDoc(newCityRef, {
            group: '일반회원'
          })
        }
      })
      await deleteDoc(doc(this.firestore, "groups", this.data.group.id))
        .then(() => {
          if (action === true) {
            window.alert('그룹을 삭제하고 사용자를 일반회원으로 이동 완료했습니다.')
          } else {
            window.alert('그룹 삭제를 완료했습니다.')
          }
        this.bottomSheetRef.dismiss()
      }).catch((error) =>{
        window.alert('그룹 삭제중에 오류가 발생했습니다.')
      })

    });
  }

}
