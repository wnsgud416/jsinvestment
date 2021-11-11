import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminUserModifyComponent } from '../dialog/admin-user-modify/admin-user-modify.component';
import { AdminUserRemoveComponent } from '../dialog/admin-user-remove/admin-user-remove.component';
import { UserNoticeDetailComponent } from '../../user_menu/dialog/user-notice-detail/user-notice-detail.component';

export interface PeriodicElement {
	Position : string;
	Name : string;
	Writer : string;
	Data : string;

}

const ELEMENT_DATA: PeriodicElement[] = [

  {Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '바이오플러스', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '9월청약일정', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[수익인증]", Name: '8월', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '일진하이솔루션', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[일정]", Name: '8월 4주차', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[일정]", Name: '8월 3주차', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '바이오플러스', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '9월청약일정', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[수익인증]", Name: '8월', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '일진하이솔루션', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[일정]", Name: '8월 4주차', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[일정]", Name: '8월 3주차', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},



];


@Component({
  selector: 'app-admin-notice-edit',
  templateUrl: './admin-notice-edit.component.html',
  styleUrls: ['./admin-notice-edit.component.css']
})
export class AdminNoticeEditComponent implements OnInit {

  displayedColumns: string[] = ['select','Position', 'Name', 'Writer', 'Data', 'action'];
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Position + 1}`;
  }

  constructor(
    private MatBottomSheet: MatBottomSheet,
			  ) { }

  ngOnInit(): void {	  
	  
  }

  Notice_Detail(){
    this.MatBottomSheet.open(UserNoticeDetailComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });

 }


}
