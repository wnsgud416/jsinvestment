import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UserCompletionDetailComponent } from '../dialog/user-completion-detail/user-completion-detail.component';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

export interface PeriodicElement {
  unit: string;
  name: string;
  sumYield: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {Month: "11월", Name: '11월 4주차 결산 내역', TotalFiled: + 97.6, Data: '2021.11.21'},
//   {Month: "11월", Name: '11월 3주차 결산 내역', TotalFiled: + 88.8, Data: '2021.11.11'},
//   {Month: "11월", Name: '11월 2주차 결산 내역', TotalFiled: + 87.6, Data: '2021.11.05'},
//   {Month: "11월", Name: '11월 1주차 결산 내역', TotalFiled: + 68.2, Data: '2021.11.01'},
//   {Month: "10월", Name: '10월 4주차 결산 내역', TotalFiled: + 78.7, Data: '2021.10.21'},
//   {Month: "10월", Name: '10월 3주차 결산 내역', TotalFiled: + 95.6, Data: '2021.10.11'},
//   {Month: "10월", Name: '10월 2주차 결산 내역', TotalFiled: + 78.5, Data: '2021.10.05'},
//  {Month: "10월", Name: '10월 1주차 결산 내역', TotalFiled: + 64.7, Data: '2021.10.01'},
//  {Month: "09월", Name: '09월 4주차 결산 내역', TotalFiled: + 57.3, Data: '2021.09.11'},
//  {Month: "09월", Name: '09월 3주차 결산 내역', TotalFiled: + 28.9, Data: '2021.09.05'},
//  {Month: "09월", Name: '09월 2주차 결산 내역', TotalFiled: + 32.1, Data: '2021.09.01'},
//  {Month: "09월", Name: '09월 1주차 결산 내역', TotalFiled: + 12.2, Data: '2021.09.21'},
//  {Month: "08월", Name: '08월 4주차 결산 내역', TotalFiled: + 41.0, Data: '2021.08.11'},
//  {Month: "08월", Name: '08월 3주차 결산 내역', TotalFiled: + 92.5, Data: '2021.08.05'},
//  {Month: "08월", Name: '08월 2주차 결산 내역', TotalFiled: + 77.7, Data: '2021.08.01'},
//  {Month: "08월", Name: '08월 1주차 결산 내역', TotalFiled: + 82.6, Data: '2021.08.21'},
//  {Month: "07월", Name: '07월 4주차 결산 내역', TotalFiled: + 68.4, Data: '2021.07.11'},
//  {Month: "07월", Name: '07월 3주차 결산 내역', TotalFiled: + 59.2, Data: '2021.07.05'},
//  {Month: "07월", Name: '07월 2주차 결산 내역', TotalFiled: + 71.8, Data: '2021.07.01'},
//  {Month: "07월", Name: '07월 1주차 결산 내역', TotalFiled: + 82.2, Data: '2021.07.21'},
//  {Month: "06월", Name: '06월 4주차 결산 내역', TotalFiled: + 65.9, Data: '2021.06.11'},
//  {Month: "06월", Name: '06월 3주차 결산 내역', TotalFiled: + 62.3, Data: '2021.06.05'},
//  {Month: "06월", Name: '06월 2주차 결산 내역', TotalFiled: + 52.6, Data: '2021.06.01'},
// ];


@Component({
  selector: 'app-user-completion',
  templateUrl: './user-completion.component.html',
  styleUrls: ['./user-completion.component.css']
})

export class UserCompletionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['unit', 'name', 'sumYield'];
  public tableRowData = new MatTableDataSource([]);

  compliteData: any = [];

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
  ) { }

  async ngOnInit(): Promise<void> {
    const auth = getAuth();

    await getDocs(collection(this.firestore, "completionStock")).then(async (querySnapshot) => {
      var user:any = auth.currentUser;
      const docRef = doc(this.firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      var userData: any = docSnap.data()
      var userGroup = userData.group;

      var stocks: any = [];
      querySnapshot.forEach((doc) => {
        var docData:any = doc.data();
        stocks.push(docData.stock);
      });
      stocks.forEach(element => {
        var stockInfoData: any = []
        var unit
        var name
        var sumYield =0;
        element.forEach(stockData => {
          var same = false
          stockData.group.forEach(groupData => {
            if (groupData === userGroup) {
              same =true
            }
          });
          if (same != false) {
            unit = stockData.date.split('-');
            name = stockData.date
            console.log(parseInt(stockData.yield));

            sumYield += parseInt(stockData.yield)
            stockInfoData.push(stockData)
          }
        });

        this.compliteData.push({
          unit: unit[1],
          name: name,
          sumYield: sumYield.toString(),
          stocks: stockInfoData
        })
      });
      console.log(this.compliteData);

      this.tableRowData = new MatTableDataSource(this.compliteData);

    })

  }

  ngAfterViewInit() {
    this.tableRowData.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }




	Completion_Detail(stocks){
    this.MatBottomSheet.open(UserCompletionDetailComponent, {
     panelClass: 'OptionModal',
     data: {stocks:stocks}
   }).afterDismissed().subscribe((result) => {

   });

 }



}
