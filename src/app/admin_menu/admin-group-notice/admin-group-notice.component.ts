import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { collection, getDocs, onSnapshot } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-admin-group-notice',
  templateUrl: './admin-group-notice.component.html',
  styleUrls: ['./admin-group-notice.component.css']
})
export class AdminGroupNoticeComponent implements OnInit {

  AllGroupUserData:any =[];



  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private store: Store<AppState>,
  ) { }

  async ngOnInit(): Promise<void> {
    var GroupData:any =[];
    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        GroupData.push(doc.data());
      });
    })
    await getDocs(collection(this.firestore, "users")).then((querySnapshot)=>{
      var GroupUserData:any =[];
      querySnapshot.forEach((doc) => {
        GroupUserData.push(doc.data());
      });

      GroupData.forEach(group => {
        var groupArray:any=[]
        GroupUserData.forEach(user => {
          if (group.name === user.group) {
            groupArray.push(user)
          }
        });
        var groupData = {
          name: group.name,
          groupMember:groupArray
        };
        this.AllGroupUserData.push(groupData);
      });
      var groupData = {
        name: "전체",
        groupMember:GroupUserData
      };
      this.AllGroupUserData.unshift(groupData)
      // GroupUserData.forEach(userdata => {
      //   this.AllUserData.push(userdata)
      //   if(userdata.group == '일반회원'){
      //     this.NomalUserData.push(userdata)
      //   }else if(userdata.group == '특별회원'){
      //     this.SpecialUserData.push(userdata)
      //   }else if(userdata.group == '관리자'){
      //     this.AdminUserData.push(userdata)
      //   }
      // });
      console.log(this.AllGroupUserData);

    })
  }

}
