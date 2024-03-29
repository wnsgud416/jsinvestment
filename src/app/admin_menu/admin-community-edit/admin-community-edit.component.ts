import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {
	Number : number;
	title : string;
	author : string;
  created_at: string;
  group: string;
  id:string;

}

@Component({
  selector: 'app-admin-community-edit',
  templateUrl: './admin-community-edit.component.html',
  styleUrls: ['./admin-community-edit.component.css']
})
export class AdminCommunityEditComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  //displayedColumns: string[] = ['select', 'Number', 'classification', 'title', 'author', 'created_at', 'action'];
  displayedColumns: string[] = ['select','Number', 'title', 'author','group', 'created_at', 'action'];
  public noticeTableData :any =[];
  public tableRowData = new MatTableDataSource ([]);
  classification
  quickActionValue
  isLoading = true;
  allGroupData:any = [];

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
			  ) { }

  async ngOnInit(): Promise<void> {
    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docData: any = doc.data()
        if (docData['name'] != "관리자") {
          this.allGroupData.push(docData['name']);
        }
      });
    })
    onSnapshot(
      collection(this.firestore, "/notices/public/community"), { includeMetadataChanges: true }, (collection) => {

        this.noticeTableData = []
        collection.forEach((doc) => {
          this.noticeTableData.push(doc.data());
        });
        this.noticeTableData.sort((a,b) => b.created_at.localeCompare(a.created_at));
        this.noticeTableData.forEach((element,i) => {
          element['number'] = i + 1;
        });
        this.tableRowData = new MatTableDataSource(this.noticeTableData);
        this.tableRowData.paginator = this.paginator;
        this.isLoading = false;
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Number + 1}`;
  }


	Notice_Add(){
		this.MatBottomSheet.open(AdminNoticeAddComponent, {
     panelClass: 'OptionModal',
     data: {page:"community", allGroupData:this.allGroupData}
   }).afterDismissed().subscribe((result) => {

   });

	}


  Notice_Detail(data,classification,title,content){
    this.MatBottomSheet.open(UserNoticeDetailComponent, {
     panelClass: 'OptionModal',
     data: {page:"community",classification:classification,title:title,content:content}
   }).afterDismissed().subscribe((result) => {

   });
 }
	Notice_Modify(data,classification,title,content,id,group){
		this.MatBottomSheet.open(AdminNoticeModifyComponent, {
     panelClass: 'OptionModal',
     data: {page:"community",classification:classification,title:title,content:content,id:id ,group:group, allGroupData:this.allGroupData}
   }).afterDismissed().subscribe((result) => {

   });
	}
    Notice_Delete(data,classification,title,name,created_at,id){
		this.MatBottomSheet.open(AdminNoticeDeleteComponent, {
     panelClass: 'OptionModal',
     data: {page:"community",classification:classification,title:title,name:name,created_at:created_at,id:id}
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
        const washingtonRef = doc(this.firestore, "notices/public/community", data.id);

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
          await deleteDoc(doc(this.firestore, "/notices/public/community", data.id))
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
