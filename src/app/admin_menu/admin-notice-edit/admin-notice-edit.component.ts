import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminUserModifyComponent } from '../dialog/admin-user-modify/admin-user-modify.component';
import { AdminUserRemoveComponent } from '../dialog/admin-user-remove/admin-user-remove.component';
import { UserNoticeDetailComponent } from '../../user_menu/dialog/user-notice-detail/user-notice-detail.component';
import { AdminNoticeAddComponent } from '../dialog/admin-notice-add/admin-notice-add.component';
import { AdminNoticeDeleteComponent } from '../dialog/admin-notice-delete/admin-notice-delete.component';
import { AdminNoticeModifyComponent } from '../dialog/admin-notice-modify/admin-notice-modify.component';
import { collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';


export interface PeriodicElement {
	Number : number;
	classification : string;
	title : string;
	author : string;
	created_at : string;
  id:string;

}

@Component({
  selector: 'app-admin-notice-modify',
  templateUrl: './admin-notice-edit.component.html',
  styleUrls: ['./admin-notice-edit.component.css']
})
export class AdminNoticeEditComponent implements OnInit {

  displayedColumns: string[] = ['select','Number','classification', 'title', 'author', 'created_at', 'action'];
  public noticeTableData :any =[];
  public tableRowData = new MatTableDataSource ([]);
  classification
  quickActionValue
  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
			  ) { }

  async ngOnInit(): Promise<void> {
    await getDocs(collection(this.firestore, "/notices/public/posts")).then((querySnapshot)=>{
      this.noticeTableData = []
      querySnapshot.forEach((doc) => {
        this.noticeTableData.push(doc.data());
      });
      this.tableRowData = new MatTableDataSource(this.noticeTableData);
      // this.isLoading = false;
    })
    // onSnapshot(
    //   collection(this.firestore, "/notices/public/posts"), { includeMetadataChanges: true }, (collection) => {
    //     this.noticeTableData = []
    //     collection.forEach((doc) => {
    //       this.noticeTableData.push(doc.data());
    //     });
    //     this.tableRowData = new MatTableDataSource(this.noticeTableData);
    //     this.isLoading = false;
    //   });
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Number + 1}`;
  }


	Notice_Add(){
		this.MatBottomSheet.open(AdminNoticeAddComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });

	}


  Notice_Detail(data,classification,title,content){
    this.MatBottomSheet.open(UserNoticeDetailComponent, {
     panelClass: 'OptionModal',
     data: {classification:classification,title:title,content:content}
   }).afterDismissed().subscribe((result) => {

   });
 }
	Notice_Modify(data,classification,title,content,id){
		this.MatBottomSheet.open(AdminNoticeModifyComponent, {
     panelClass: 'OptionModal',
     data: {classification:classification,title:title,content:content,id:id}
   }).afterDismissed().subscribe((result) => {

   });
	}
    Notice_Delete(data,classification,title,name,created_at,id){
		this.MatBottomSheet.open(AdminNoticeDeleteComponent, {
     panelClass: 'OptionModal',
     data: {classification:classification,title:title,name:name,created_at:created_at,id:id}
   }).afterDismissed().subscribe((result) => {

   });
	}

  CheckClassification(){
    if(this.classification==undefined){
      window.alert('분류를 선택해 주세요.')
    } else {
      var index = this.selection.selected.length-1
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateTimeString = year + '-' + month  + '-' + day;

      this.selection.selected.forEach(async (data,i)=>{
        const washingtonRef = doc(this.firestore, "notices/public/posts", data.id);

        await updateDoc(washingtonRef, {
          classification: this.classification,
          updated_at:dateTimeString
        })
        .then(()=>{
          if(i ==index){
            window.alert('분류 이동을 완료했습니다.')
          }
        }).catch((error) =>{
          window.alert('분류 이동중에 오류가 발생했습니다.')
        })
      })

    }
  }
  CheckQuickAction(){
    if(this.quickActionValue==undefined){
      window.alert('일괄 기능을 선택해 주세요.')
    } else {
      var index = this.selection.selected.length-1
      if(this.quickActionValue==="삭제"){
        this.selection.selected.forEach(async (data,i)=>{
          await deleteDoc(doc(this.firestore, "/notices/public/posts", data.id))
          .then(()=>{
            if(i ==index){
              window.alert('공지사항 삭제를 완료했습니다.')
            }
          }).catch((error) =>{
            window.alert('공지사항 삭제중에 오류가 발생했습니다.')
          })
        })
      }
    }
  }


}
