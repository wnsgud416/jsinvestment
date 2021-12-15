import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import * as $ from 'jquery';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';

export interface PeriodicElement {
	number : number;
	code : string;
	name : string;
	currentPrice : string;
	buyingPrice : string;
	yield : number;
}


@Component({
  selector: 'app-user-recommended',
  templateUrl: './user-recommended.component.html',
  styleUrls: ['./user-recommended.component.css']
})
export class UserRecommendedComponent implements OnInit {

  displayedColumns: string[] = ['number', 'code', 'name', 'currentPrice', 'buyingPrice', 'yield'];
  public tableRowData = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  stockInfoData: any = [];

  constructor(
    private firestore: Firestore,
  ) { }

  async ngOnInit(): Promise<void> {
    const auth = getAuth();

    await getDocs(collection(this.firestore, "stockInfo")).then(async (querySnapshot) => {
      var user:any = auth.currentUser;
      const docRef = doc(this.firestore, "users", user.uid);
      const docSnap = await getDoc(docRef);
      var userData: any = docSnap.data()
      var userGroup = userData.group;

      var stocks: any = [];
      querySnapshot.forEach((doc) => {
        stocks.push(doc.data());
      });
      stocks.forEach(element => {
        var same = false
        element.group.forEach(groupData => {
          if (groupData === userGroup) {
            same =true
          }
        });
        if (same != false) {
          this.stockInfoData.push(element);
        }
      });
      this.stockInfoData.forEach((element,i) => {
        //현재가 찾아서 각자 이름에 적용
        //수익률 계산해서 추가
        this.stockInfoData[i]['currentPrice'] = "0"
        this.stockInfoData[i]['yield'] = "0"
        this.stockInfoData[i]['number'] = i+1
      });
      this.tableRowData = new MatTableDataSource(this.stockInfoData);

    })

	  $({ val : 0 }).animate({ val : 8900 }, {


				  duration: 5000,
				  step: function() {
					var num = numberWithCommas(Math.floor(this.val));
					if(num > 0){
						  $(".User_Total_Value").val(num);
						  $(".User_Total_Value").removeClass("MinusNumber");
						  $(".User_Total_Value").addClass("PlusNumber");
						  }
					  else{
						  $(".User_Total_Value").val(num);
						  $(".User_Total_Value").removeClass("PlusNumber");
						  $(".User_Total_Value").addClass("MinusNumber");
					  }
				  },
				  complete: function() {
					var num = numberWithCommas(Math.floor(this.val));
						  $(".User_Total_Value").val(num);

				    }
				});


		function numberWithCommas(x) {
					return x.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
		}


  }

	ngAfterViewInit() {
    this.tableRowData.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  numChange(num) {
    var changeNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return changeNum
  }



}
