import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UserNoticeDetailComponent } from '../dialog/user-notice-detail/user-notice-detail.component';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, onSnapshot, orderBy } from '@firebase/firestore';



export interface PeriodicElement {
  Number : number;
	classification : string;
	title : string;
	author : string;
	created_at : string;
  id:string;
}

@Component({
  selector: 'app-user-notice',
  templateUrl: './user-notice.component.html',
  styleUrls: ['./user-notice.component.css']
})



export class UserNoticeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Number','classification', 'title', 'author', 'created_at'];
  public noticeTableData :any =[];
  public tableRowData = new MatTableDataSource ([]);
  isLoading = true;

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
          ) { }

  async ngOnInit(): Promise<void> {
    await getDocs(collection(this.firestore, "/notices/public/posts")).then((querySnapshot)=>{
      this.noticeTableData = []
      querySnapshot.forEach((doc) => {
        this.noticeTableData.push(doc.data());
      });
      this.noticeTableData.sort((a, b) => b.created_at.localeCompare(a.created_at));
      this.noticeTableData.forEach((element,i) => {
        element['number'] = i + 1;
      });
      this.tableRowData = new MatTableDataSource(this.noticeTableData);
      this.tableRowData.paginator = this.paginator;
      this.isLoading = false;
    })
    // onSnapshot(
    //   collection(this.firestore, "/notices/public/posts"), { includeMetadataChanges: true }, (collection) => {
    //     this.noticeTableData = []
    //     collection.forEach((doc) => {
    //       this.noticeTableData.push(doc.data());
    //     });
    //     this.tableRowData = new MatTableDataSource(this.noticeTableData);
    //     this.isLoading = false;
    //   });

    }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }




	Notice_Detail(row){
		 this.MatBottomSheet.open(UserNoticeDetailComponent, {
      panelClass: 'OptionModal',
      data: {classification:row.classification,title:row.title,content:row.content}
    }).afterDismissed().subscribe((result) => {

    });

	}



}
