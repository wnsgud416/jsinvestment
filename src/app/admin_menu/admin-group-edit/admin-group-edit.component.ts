import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { addDoc, collection, doc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { AdminUserModifyComponent } from '../dialog/admin-user-modify/admin-user-modify.component';
import { AdminUserRemoveComponent } from '../dialog/admin-user-remove/admin-user-remove.component';

import { AppState } from '../../store';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AdminGroupModifyComponent } from '../dialog/admin-group-modify/admin-group-modify.component';
import { AdminGroupRemoveComponent } from '../dialog/admin-group-remove/admin-group-remove.component';

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})

export class AdminGroupEditComponent implements OnInit {

  public createGroupName;
  public groupArray:any = [];
  public userTableData: any = [];
  public groupUserData: any ={};
  public clickUserinfo;

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private store: Store<AppState>,
    private actions$: Actions,
			  ) { }

  async ngOnInit(): Promise<void> {



    onSnapshot(

      collection(this.firestore, "groups"), { includeMetadataChanges: true }, (collectionGroupData) => {
        this.groupUserData ={};
        this.groupArray = [];
        collectionGroupData.forEach((doc) => {
          this.groupArray.push(doc.data());
        });
        onSnapshot(
          collection(this.firestore, "users"), { includeMetadataChanges: true }, (collectionUserData) => {
            this.userTableData= [];
            collectionUserData.forEach((doc) => {
              this.userTableData.push(doc.data());
            });
            this.groupArray.forEach(groupData => {
              var userArray: any = [];
              this.userTableData.forEach(userData => {
                if (groupData.name === userData.group) {
                  userArray.push(userData)
                }
                this.groupUserData[groupData.name] = userArray
              });
            });
          });
      });
    console.log(this.groupUserData);
  }
	User_Remove(){
	  this.MatBottomSheet.open(AdminUserRemoveComponent, {
      panelClass: 'OptionModal',
      data: {name:this.clickUserinfo.name, phone:this.clickUserinfo.phone, id:this.clickUserinfo.id, email:this.clickUserinfo.email}
    }).afterDismissed().subscribe((result) => {

    });

  }

  User_Edit(){
	  this.MatBottomSheet.open(AdminUserModifyComponent, {
      panelClass: 'OptionModal',
      data: {name:this.clickUserinfo.name, phone:this.clickUserinfo.phone, id:this.clickUserinfo.id, email:this.clickUserinfo.email}
    }).afterDismissed().subscribe((result) => {

    });

  }
  async moveGroup(text) {
    const washingtonRef = doc(this.firestore, "users", this.clickUserinfo.id);

    await updateDoc(washingtonRef, {
      group: text,
    })
    .then(()=>{
      window.alert('그룹 수정을 완료했습니다.')
    }).catch((error) =>{
      window.alert('그룹 수정중에 오류가 발생했습니다.')
    })
  }
  listClick(user) {
    this.clickUserinfo = user;
  }
  async createGroup() {
    var same = false;
    this.groupArray.forEach(group => {
      if (group.name === this.createGroupName) {
        same = true;
      }
    });
    if (same == false) {
      var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);

      var dateString = year + '-' + month + '-' + day
      const newCityRef = doc(collection(this.firestore, "groups"));

      var data = {
        created_at:dateString,
        id: newCityRef.id,
        name: this.createGroupName,
        updated_at: dateString
      }
      await setDoc(newCityRef, data).then(() => {
        window.alert('그룹 생성을 완료했습니다.')
      }).catch((error) => {
        window.alert('그룹 생성중에 오류가 발생했습니다.');
      })
    } else {
      window.alert('그룹 중에 같은 그룹명이 있습니다.')
    }
  }

Group_Edit(){
	  this.MatBottomSheet.open(AdminGroupModifyComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {
    });
  }

  Group_Remove(){
	  this.MatBottomSheet.open(AdminGroupRemoveComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {
    });
	}
}
