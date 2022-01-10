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
  docId: any = [];
  userGroup

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
  ) { }

  async ngOnInit(): Promise<void> {
    this.getStockData()

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }




	Completion_Detail(row,index){
    this.MatBottomSheet.open(UserCompletionDetailComponent, {
     panelClass: 'OptionModal',
     data: {stocks:row.stocks,unit:row.unit,title:row.name, docId : this.docId[index],userGroup:this.userGroup}
    }).afterDismissed().subscribe((result) => {
      this.getStockData()
   });

  }

  async getStockData() {
    this.compliteData = [];
    const auth = getAuth();

    await getDocs(collection(this.firestore, "completionStock")).then(async (querySnapshot) => {
      var user:any = auth.currentUser;
      const docRef = doc(this.firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      var userData: any = docSnap.data()
      this.userGroup = userData.group;

      var stocks: any = [];
      querySnapshot.forEach((doc) => {

        var docData:any = doc.data();
        stocks.push(docData.stock);
        this.docId.push(doc.id)
      });
      stocks.forEach(element => {
        var stockInfoData: any = []
        var unit
        var name
        var sumYield = 0;

        element.forEach(stockData => {
          unit = stockData.date.split('-');
          name = stockData.date
          sumYield += parseInt(stockData.yield)
          stockInfoData.push(stockData)
        });

        this.compliteData.push({
          unit: unit[1],
          name: name,
          sumYield: sumYield.toString(),
          stocks: stockInfoData
        })
      });

      this.tableRowData = new MatTableDataSource(this.compliteData);
      this.tableRowData.paginator = this.paginator;

    })
  }



}
