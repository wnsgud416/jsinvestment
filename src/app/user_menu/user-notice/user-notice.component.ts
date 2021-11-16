import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UserNoticeDetailComponent } from '../dialog/user-notice-detail/user-notice-detail.component';
import { getAuth } from '@firebase/auth';


export interface PeriodicElement {
  Number: number;
  Position: string;
  Name: string;
  Writer: string;
  Data: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Number: 1,Position: "[공모주]", Name: '실리콘투', Writer: "관리자", Data: '2021.09.01'},
  {Number: 2,Position: "[공모주]", Name: '바이오플러스', Writer: "관리자", Data: '2021.09.01'},
  {Number: 3,Position: "[공모주]", Name: '현대중공업', Writer: "관리자", Data: '2021.09.01'},
  {Number: 4,Position: "[공모주]", Name: '9월청약일정', Writer: "관리자", Data: '2021.09.01'},
  {Number: 5,Position: "[수익인증]", Name: '8월', Writer: "관리자", Data: '2021.09.01'},
  {Number: 6,Position: "[공모주]", Name: '와이엠텍', Writer: "관리자", Data: '2021.09.01'},
  {Number: 7,Position: "[공모주]", Name: '일진하이솔루션', Writer: "관리자", Data: '2021.09.01'},
  {Number: 8,Position: "[일정]", Name: '8월 4주차', Writer: "관리자", Data: '2021.09.01'},
  {Number: 9,Position: "[공모주]", Name: '바이젠셀', Writer: "관리자", Data: '2021.09.01'},
  {Number: 10,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 11,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 12,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 13,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 14,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 15,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 16,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 17,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 18,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 19,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 20,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 21,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 22,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 23,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 24,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
  {Number: 25,Position: "[공모주]", Name: '아주스틸', Writer: "관리자", Data: '2021.09.01'},
];


@Component({
  selector: 'app-user-notice',
  templateUrl: './user-notice.component.html',
  styleUrls: ['./user-notice.component.css']
})



export class UserNoticeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Number','Position', 'Name', 'Writer', 'Data'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
