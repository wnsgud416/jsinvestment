import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface PeriodicElement {
	email : string;
	name : string;
	phone : string;
	group : string;
	data : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	
  {email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},
	{email: "js1234@example.com", name: '홍길동', phone: "010-1234-5678", group: '일반회원', data: '2021-11-11'},

];


@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})

export class AdminUserEditComponent implements OnInit {

  displayedColumns: string[] = ['select','email', 'name', 'phone', 'group', 'data', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email + 1}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
