import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminUserModifyComponent } from '../dialog/admin-user-modify/admin-user-modify.component';
import { AdminUserRemoveComponent } from '../dialog/admin-user-remove/admin-user-remove.component';

export interface PeriodicElement {
	email : string;
	name : string;
	phone : string;
	group : string;
	data : string;
	Subscription : string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11', Subscription: '2021-12-31'},

];


@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})

export class AdminUserEditComponent implements OnInit {

  displayedColumns: string[] = ['select','email', 'name', 'phone', 'group', 'data','Subscription', 'action'];
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email + 1}`;
  }

  constructor(
	private MatBottomSheet: MatBottomSheet,
			  ) { }

  ngOnInit(): void {
  }

	User_Remove(data){
	  this.MatBottomSheet.open(AdminUserRemoveComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

  }
	User_Edit(data){
	  this.MatBottomSheet.open(AdminUserModifyComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

	}

}
