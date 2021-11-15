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


export interface PeriodicElement {
	Numer : number;
	Position : string;
	Name : string;
	Writer : string;
	Data : string;

}

const ELEMENT_DATA: PeriodicElement[] = [

  {Numer:1,Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Numer:2,Position: "[공모주]", Name: '바이오플러스', Writer: "관리자", Data: '2021.09.01'},
  {Numer:3,Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Numer:4,Position: "[공모주]", Name: '9월청약일정', Writer: "관리자", Data: '2021.09.01'},
  {Numer:5,Position: "[수익인증]", Name: '8월', Writer: "관리자", Data: '2021.09.01'},
  {Numer:6,Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Numer:7,Position: "[공모주]", Name: '일진하이솔루션', Writer: "관리자", Data: '2021.09.01'},
  {Numer:8,Position: "[일정]", Name: '8월 4주차', Writer: "관리자", Data: '2021.09.01'},
  {Numer:9,Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Numer:10,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Numer:11,Position: "[일정]", Name: '8월 3주차', Writer: "관리자", Data: '2021.09.01'},
  {Numer:12,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Numer:13,Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Numer:14,Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Numer:15,Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Numer:16,Position: "[공모주]", Name: '바이오플러스', Writer: "관리자", Data: '2021.09.01'},
  {Numer:17,Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Numer:18,Position: "[공모주]", Name: '9월청약일정', Writer: "관리자", Data: '2021.09.01'},
  {Numer:19,Position: "[수익인증]", Name: '8월', Writer: "관리자", Data: '2021.09.01'},
  {Numer:20,Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Numer:21,Position: "[공모주]", Name: '일진하이솔루션', Writer: "관리자", Data: '2021.09.01'},
  {Numer:22,Position: "[일정]", Name: '8월 4주차', Writer: "관리자", Data: '2021.09.01'},
  {Numer:23,Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Numer:24,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Numer:25,Position: "[일정]", Name: '8월 3주차', Writer: "관리자", Data: '2021.09.01'},
  {Numer:26,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Numer:27,Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Numer:28,Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},



];


@Component({
  selector: 'app-admin-notice-modify',
  templateUrl: './admin-notice-edit.component.html',
  styleUrls: ['./admin-notice-edit.component.css']
})
export class AdminNoticeEditComponent implements OnInit {

  displayedColumns: string[] = ['select','Numer','Position', 'Name', 'Writer', 'Data', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }



  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Numer + 1}`;
  }

  constructor(
    private MatBottomSheet: MatBottomSheet,
			  ) { }

  ngOnInit(): void {

  }
	Notice_Add(){
		this.MatBottomSheet.open(AdminNoticeAddComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });

	}


  Notice_Detail(data){
    this.MatBottomSheet.open(UserNoticeDetailComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });
 }
	Notice_Modify(data){
		this.MatBottomSheet.open(AdminNoticeModifyComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });
	}
    Notice_Delete(data){
		this.MatBottomSheet.open(AdminNoticeDeleteComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });
	}


}
