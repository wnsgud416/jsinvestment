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
  GroupData: any = [];
  userGroup
  selectGroup;
  isLoading = true;

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
  ) { }

  async ngOnInit(): Promise<void> {
    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data()['name'] != '관리자') {
          this.GroupData.push(doc.data()['name']);
        }
      });
    })

    const auth = await getAuth();
    var user:any = auth.currentUser;
      const docRef = doc(this.firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      var userData: any = docSnap.data()
      this.userGroup = userData.group;
      this.selectGroup = userData.group;
      if (userData.group == "관리자") {
        this.selectGroup = "일반회원"
      }

    this.getStockData()

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }


	Completion_Detail(row,index){
    this.MatBottomSheet.open(UserCompletionDetailComponent, {
     panelClass: 'OptionModal',
     data: {stocks:row.stocks,unit:row.unit,title:row.name, docId : this.docId[index],userGroup:this.userGroup,selectGroup:this.selectGroup}
    }).afterDismissed().subscribe((result) => {
      this.getStockData()
   });

  }

  async getStockData() {
    this.compliteData = [];
    await getDocs(collection(this.firestore, "completionStock")).then(async (querySnapshot) => {
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

        var groupOn = false;
        element.forEach(stockData => {

          stockData.group.forEach(groupData => {
            if (groupData === this.selectGroup) {
              groupOn = true
            }
          })
          if (groupOn != false) {
            unit = stockData.date.split('-');
            name = stockData.date
            sumYield += parseInt(stockData.yield)
            stockInfoData.push(stockData)
          }
        });
        if (stockInfoData.length != 0) {
          this.compliteData.push({
            unit: unit[1],
            name: name,
            sumYield: sumYield.toString(),
            stocks: stockInfoData
          })
        }

      });

      this.tableRowData = new MatTableDataSource(this.compliteData);
      this.tableRowData.paginator = this.paginator;
      this.isLoading = false;
    })
  }

  stockGroupChange(group) {
    this.selectGroup = group
    this.getStockData()
  }



}
