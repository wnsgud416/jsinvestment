import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { collection, getDocs, onSnapshot } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as Action from 'src/app/store/actions/action';
import { take } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-admin-group-notice',
  templateUrl: './admin-group-notice.component.html',
  styleUrls: ['./admin-group-notice.component.css']
})
export class AdminGroupNoticeComponent implements OnInit {

  AllGroupUserData:any =[];
  selectedUser: any = [];
  messageText:any


  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private store: Store<AppState>,
    private actions$: Actions,
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
    })
  }

  tabChange() {
    this.selectedUser = []
  }
  send(groupName) {
    var selectGroupIndex
    this.AllGroupUserData.forEach((element,i) => {
      if (element.name === groupName) {
        selectGroupIndex = i
      }
    });
    var sendUser:any =[]
    this.AllGroupUserData[selectGroupIndex]['groupMember'].forEach(member => {
      sendUser.push(member)
    });

    if (this.selectedUser.length == 0) {
      this.sendMessage(sendUser)
    } else {
      for (let i = 0; i < sendUser.length; i++) {
        this.selectedUser.forEach((element) => {
          if (sendUser[i].id === element.id) {
            sendUser.splice(i, 1);
          }
        })
      }

      this.sendMessage(sendUser)
    }
  }

  sendMessage(users) {
    var sendToken:any = [];

    users.forEach(element => {
      if (element.notification_onoff == true && element.notification_token != "") {
        sendToken.push(element.notification_token)
      }
    });
    console.log(sendToken);

    this.store.dispatch(Action.sendMessage({ sendToken:sendToken, messageText:this.messageText }))
      this.actions$.pipe(ofType(Action.sendMessageSuccess)).pipe(take(1)).subscribe(async (result) => {
        window.alert('메시지가 전송되었습니다.')
      });
    // if (sendToken.length == 0) {
    //   window.alert('메시지를 보낼 인원이 없습니다.\n알림설정을 하시거나 체크를 해제하세요.')
    // } else {

    // }




  }
}
