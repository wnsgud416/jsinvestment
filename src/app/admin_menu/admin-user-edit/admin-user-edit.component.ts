import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, _MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminUserModifyComponent } from '../dialog/admin-user-modify/admin-user-modify.component';
import { AdminUserRemoveComponent } from '../dialog/admin-user-remove/admin-user-remove.component';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Actions, ofType } from '@ngrx/effects';
import * as Action from 'src/app/store/actions/action';
import { take } from 'rxjs';

export interface PeriodicElement {
	email : string;
	name : string;
	phone : string;
	group : string;
	created_at : string;
	updated_at : string;
  id:string;
}

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})

export class AdminUserEditComponent implements OnInit {

  displayedColumns: string[] = ['select','email', 'name', 'phone', 'group', 'created_at','updated_at', 'action'];

  public userTableData :any =[];
  public tableRowData
  public clickUserid
  public selectedGroup;
  public quickActionValue;
  public checkSubscriptionValue;
  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private store: Store<AppState>,
    private actions$: Actions,
          ) { }

    async ngOnInit(): Promise<void> {

       await getDocs(collection(this.firestore, "users")).then((collection)=>{
        collection.forEach((doc) => {

          this.userTableData.push(doc.data());

        });
        console.log(this.userTableData);

        this.tableRowData = new MatTableDataSource(this.userTableData);
      });
    }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableRowData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableRowData.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email + 1}`;
  }



	User_Remove(name,data,phone,id,email){
	  this.MatBottomSheet.open(AdminUserRemoveComponent, {
      panelClass: 'OptionModal',
      data: {name:name, phone:phone, id:id, email:email}
    }).afterDismissed().subscribe((result) => {

    });

  }
	User_Edit(name,data,phone,id,email){
    console.log(name);
    console.log(phone);
	  this.MatBottomSheet.open(AdminUserModifyComponent, {
      panelClass: 'OptionModal',
      data: {name:name, phone:phone, id:id, email:email}
    }).afterDismissed().subscribe((result) => {

    });

	}
  groupClick(data,userid){
    this.clickUserid = userid
  }

  async groupMove(group){
    const washingtonRef = doc(this.firestore, "users", this.clickUserid);

    await updateDoc(washingtonRef, {
      group: group,
    })
    .then(()=>{
      window.alert('그룹 수정을 완료했습니다.')
      window.location.reload()
    }).catch((error) =>{
      window.alert('그룹 수정중에 오류가 발생했습니다.')
    })
  }

  checkGroup(){
    console.log(this.selectedGroup);
    if(this.selectedGroup == undefined){
      window.alert('이동할 그룹을 선택해 주세요.')
    }else{
      this.selection.selected.forEach(async (data,i)=>{
        const washingtonRef = doc(this.firestore, "users", data.id);

        await updateDoc(washingtonRef, {
          group: this.selectedGroup,
        })
        .then(()=>{
          if(i ==this.selection.selected.length-1){
            window.alert('그룹 수정을 완료했습니다.')
            window.location.reload()
          }
        }).catch((error) =>{
          window.alert('그룹 수정중에 오류가 발생했습니다.')
        })
      })
    }
  }
  quickAction(){
    if(this.quickActionValue==undefined){
      window.alert('일괄 기능을 선택해 주세요.')
    }else{
      if(this.quickActionValue==="user_Delete"){
        var userIds:any = [];
        this.selection.selected.forEach(data=>{
          userIds.push(data.id)
        })
        this.store.dispatch(Action.userDelete({ id:userIds}))
        this.actions$.pipe(ofType(Action.userDeleteSuccess)).pipe(take(1)).subscribe(async () => {
          this.selection.selected.forEach(async (data,i)=>{
            await deleteDoc(doc(this.firestore, "users", data.id))
            .then(()=>{
              if(i ==this.selection.selected.length-1){
                window.alert('회원 삭제를 완료했습니다.')
                window.location.reload()
              }
            }).catch((error) =>{
              window.alert('회원 삭제중에 오류가 발생했습니다.')
            })
          })
        });
      }else if(this.quickActionValue==="SubscriptionEnd"){
        this.selection.selected.forEach(async (data,i)=>{
          const washingtonRef = doc(this.firestore, "users", data.id);
          await updateDoc(washingtonRef, {
            updated_at: "expired",
          })
          .then(()=>{
            if(i ==this.selection.selected.length-1){
              window.alert('구독 종료를 완료했습니다.')
              window.location.reload()
            }
          }).catch((error) =>{
            window.alert('구독 종료중에 오류가 발생했습니다.')
            window.location.reload()
          })
        })
      }
    }


  }
  async subscription(event,id){
    console.log(event);
    var year = event.getFullYear();
    var month = ('0' + (event.getMonth() + 1)).slice(-2);
    var day = ('0' + event.getDate()).slice(-2);

    var dateString = year + '-' + month  + '-' + day

    console.log(dateString);
    const washingtonRef = doc(this.firestore, "users", id);

    await updateDoc(washingtonRef, {
      updated_at: dateString,
    })
    .then(()=>{
        window.alert('구독 날짜 수정을 완료했습니다.')
        window.location.reload()
    }).catch((error) =>{
      window.alert('구독 날짜 수정중에 오류가 발생했습니다.')
      window.location.reload()
    })

  }

  checkSubscription(){
    console.log(this.checkSubscriptionValue);

    if(this.checkSubscriptionValue == undefined){
      window.alert('구독 날짜를 선택해 주세요.')
    }else{
      var year = this.checkSubscriptionValue.getFullYear();
      var month = ('0' + (this.checkSubscriptionValue.getMonth() + 1)).slice(-2);
      var day = ('0' + this.checkSubscriptionValue.getDate()).slice(-2);

      var dateString = year + '-' + month  + '-' + day

      console.log(dateString);
      this.selection.selected.forEach(async (data,i)=>{
        const washingtonRef = doc(this.firestore, "users", data.id);

        await updateDoc(washingtonRef, {
          updated_at: dateString,
        })
        .then(()=>{
          if(i ==this.selection.selected.length-1){
            window.alert('구독 날짜 수정을 완료했습니다.')
            window.location.reload()
          }
        }).catch((error) =>{
          window.alert('구독 날짜 수정중에 오류가 발생했습니다.')
          window.location.reload()
        })
      });

    }

  }


}
