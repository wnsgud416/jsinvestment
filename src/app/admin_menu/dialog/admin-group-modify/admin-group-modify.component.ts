import { Component, Inject, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-admin-group-modify',
  templateUrl: './admin-group-modify.component.html',
  styleUrls: ['./admin-group-modify.component.css']
})
export class AdminGroupModifyComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminGroupModifyComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

    groupName
  ngOnInit(): void {
    this.groupName = this.data.group.name
  }

	close() {
    this.bottomSheetRef.dismiss()
  }
  async save() {
    var same = false;
    this.data.groupArray.forEach(group => {
      if (group.name === this.groupName) {
        same = true;
      }
    });
    if (same == false) {
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);

      var dateString = year + '-' + month + '-' + day
      await getDocs(collection(this.firestore, 'users')).then(async (collection) => {
        collection.forEach(async (docs) => {
          var docData:any = docs.data()
          if (docData.group === this.data.group.name) {

            const newCityRef = doc(this.firestore, "users",docData.id);

            await updateDoc(newCityRef, {
              group: this.groupName
            })
          }
        })
      });

      const newCityRef = doc(this.firestore, "groups",this.data.group.id);

      await updateDoc(newCityRef, {
        name: this.groupName,
        updated_at : dateString
      }).then(() => {
        window.alert('그룹 수정을 완료했습니다.')
        this.bottomSheetRef.dismiss()
      }).catch((error) => {
        window.alert('그룹 수정중에 오류가 발생했습니다.');
      })
    } else {
      window.alert('그룹 중에 같은 그룹명이 있습니다.')
    }
    }

}
