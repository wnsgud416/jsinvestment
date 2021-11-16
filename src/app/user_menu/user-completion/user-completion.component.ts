import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UserCompletionDetailComponent } from '../dialog/user-completion-detail/user-completion-detail.component';

export interface PeriodicElement {
  Month: string;
  Name: string;
  TotalFiled: string;
  Data: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Month: "11월", Name: '11월 4주차 결산 내역', TotalFiled: "+ 97.6%", Data: '2021.11.21'},
  {Month: "11월", Name: '11월 3주차 결산 내역', TotalFiled: "+ 88.8%", Data: '2021.11.11'},
  {Month: "11월", Name: '11월 2주차 결산 내역', TotalFiled: "+ 87.6%", Data: '2021.11.05'},
  {Month: "11월", Name: '11월 1주차 결산 내역', TotalFiled: "+ 68.2%", Data: '2021.11.01'},
  {Month: "10월", Name: '10월 4주차 결산 내역', TotalFiled: "+ 78.7%", Data: '2021.10.21'},
  {Month: "10월", Name: '10월 3주차 결산 내역', TotalFiled: "+ 95.6%", Data: '2021.10.11'},
  {Month: "10월", Name: '10월 2주차 결산 내역', TotalFiled: "+ 78.5%", Data: '2021.10.05'},
 {Month: "10월", Name: '10월 1주차 결산 내역', TotalFiled: "+ 64.7%", Data: '2021.10.01'},
 {Month: "09월", Name: '09월 4주차 결산 내역', TotalFiled: "+ 57.3%", Data: '2021.09.11'},
 {Month: "09월", Name: '09월 3주차 결산 내역', TotalFiled: "+ 28.9%", Data: '2021.09.05'},
 {Month: "09월", Name: '09월 2주차 결산 내역', TotalFiled: "+ 32.1%", Data: '2021.09.01'},
 {Month: "09월", Name: '09월 1주차 결산 내역', TotalFiled: "+ 12.2%", Data: '2021.09.21'},
 {Month: "08월", Name: '08월 4주차 결산 내역', TotalFiled: "+ 41.0%", Data: '2021.08.11'},
 {Month: "08월", Name: '08월 3주차 결산 내역', TotalFiled: "+ 92.5%", Data: '2021.08.05'},
 {Month: "08월", Name: '08월 2주차 결산 내역', TotalFiled: "+ 77.7%", Data: '2021.08.01'},
 {Month: "08월", Name: '08월 1주차 결산 내역', TotalFiled: "+ 82.6%", Data: '2021.08.21'},
 {Month: "07월", Name: '07월 4주차 결산 내역', TotalFiled: "+ 68.4%", Data: '2021.07.11'},
 {Month: "07월", Name: '07월 3주차 결산 내역', TotalFiled: "+ 59.2%", Data: '2021.07.05'},
 {Month: "07월", Name: '07월 2주차 결산 내역', TotalFiled: "+ 71.8%", Data: '2021.07.01'},
 {Month: "07월", Name: '07월 1주차 결산 내역', TotalFiled: "+ 82.2%", Data: '2021.07.21'},
 {Month: "06월", Name: '06월 4주차 결산 내역', TotalFiled: "+ 65.9%", Data: '2021.06.11'},
 {Month: "06월", Name: '06월 3주차 결산 내역', TotalFiled: "+ 62.3%", Data: '2021.06.05'},
 {Month: "06월", Name: '06월 2주차 결산 내역', TotalFiled: "+ 52.6%", Data: '2021.06.01'},
];


@Component({
  selector: 'app-user-completion',
  templateUrl: './user-completion.component.html',
  styleUrls: ['./user-completion.component.css']
})

export class UserCompletionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Month', 'Name', 'TotalFiled', 'Data'];
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

	Completion_Detail(){
    this.MatBottomSheet.open(UserCompletionDetailComponent, {
     panelClass: 'OptionModal',
     data: {}
   }).afterDismissed().subscribe((result) => {

   });

 }



}
