import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { UserNoticeDetailComponent } from '../dialog/user-notice-detail/user-notice-detail.component';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { collection, getDocs, onSnapshot } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';



export interface PeriodicElement {
  Number : number;
	title : string;
	author : string;
	created_at : string;
  id:string;
}

@Component({
  selector: 'app-user-community',
  templateUrl: './user-community.component.html',
  styleUrls: ['./user-community.component.css']
})
export class UserCommunityComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['Number', 'title', 'author', 'created_at'];
  public noticeTableData :any =[];
  public tableRowData = new MatTableDataSource ([]);
  isLoading = true;
  userGroup
  choiceGroup
  allGroupData:any = []

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
          ) { }

  async ngOnInit(): Promise<void> {
    await getDocs(collection(this.firestore, "groups")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docData:any = doc.data()
        this.allGroupData.push(docData['name']);
      });
    })

      const auth = await getAuth();
      var user:any = auth.currentUser;
      const docRef = doc(this.firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      var userData: any = docSnap.data()
      this.userGroup = userData.group;
      this.choiceGroup = userData.group
    this.getCommunityData(this.userGroup)
      // await getDocs(collection(this.firestore, "/notices/public/community")).then((querySnapshot)=>{
      //   this.noticeTableData = []
      //   querySnapshot.forEach((doc) => {
      //     this.noticeTableData.push(doc.data());
      //   });
      //   this.noticeTableData.sort((a,b) => b.created_at.localeCompare(a.created_at));
      //   this.noticeTableData.forEach((element,i) => {
      //     element['number'] = i + 1;
      //   });
      //   this.tableRowData = new MatTableDataSource(this.noticeTableData);
      //   this.tableRowData.paginator = this.paginator;
      //   this.isLoading = false;
      // })

    }

  ngAfterViewInit() {
    this.tableRowData.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }




  Notice_Detail(row) {
		 this.MatBottomSheet.open(UserNoticeDetailComponent, {
      panelClass: 'OptionModal',
      data: {classification:row.classification,title:row.title,content:row.content}
    }).afterDismissed().subscribe((result) => {

    });

  }

  async getCommunityData(selectGroup) {
    this.noticeTableData = [];

    await getDocs(collection(this.firestore, "/notices/public/community")).then(async (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docData: any = doc.data();
        docData.group.forEach(element => {
          if (selectGroup == element) {
            this.noticeTableData.push({
              title: docData.title,
              author: docData.author,
              created_at: docData.created_at,
              content: docData.content
            })
          }
        });
      });

      this.noticeTableData.sort((a,b) => b.created_at.localeCompare(a.created_at));
      this.noticeTableData.forEach((element,i) => {
        element['number'] = i + 1;
      });
      this.tableRowData = new MatTableDataSource(this.noticeTableData);
      this.tableRowData.paginator = this.paginator;
      this.isLoading = false;
    })
  }

}
