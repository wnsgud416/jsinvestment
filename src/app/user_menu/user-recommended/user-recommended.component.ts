import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import * as $ from 'jquery';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as Action from 'src/app/store/actions/action';
import { take, interval } from 'rxjs';

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
  allYield;

  interval;

  constructor(
    private firestore: Firestore,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { }

  async ngOnInit(): Promise<void> {
    const auth = getAuth();

    var reflashValue:any
    await getDoc(doc(this.firestore, "admin", "reflashStock")).then(async (docData) => {
      var docValue :any = docData.data()
      reflashValue = parseInt(docValue['value'])*1000

    });
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

      var stockCodeArray:any = [];
      this.stockInfoData.forEach((element,i) => {
        stockCodeArray.push(element.code)
      });

      this.getStockInfo(stockCodeArray)
      this.interval = setInterval(() => {
        this.getStockInfo(stockCodeArray)
      }, reflashValue);


    })

	  $({ val : 0 }).animate({ val : 8900 }, {
      //총 수익률
      // this.allYield

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableRowData.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  numChange(num) {
    var changeNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return changeNum
  }

  getStockInfo(stockCodeArray) {
    var stockCurrentPrice
    this.store.dispatch(Action.cmdTest({ stockCodeArray:stockCodeArray}))
    this.actions$.pipe(ofType(Action.cmdTestSuccess)).pipe(take(1)).subscribe(async (result) => {
      stockCurrentPrice = JSON.parse(result.result)
      console.log(stockCurrentPrice);

      var SumYield = 0;
      this.stockInfoData.forEach((element,i) => {
        //현재가 찾아서 각자 이름에 적용
        //수익률 계산해서 추가
        var currentPrice;
        var yieldData;
        stockCurrentPrice.forEach((stockData,j) => {

          if(stockData.stockCode ===element.code){
            currentPrice =stockData.currentPrice
          }
        });
        yieldData = ((parseInt(currentPrice)/parseInt(element.buyingPrice))*100-100).toFixed(2)
        SumYield +=yieldData
        this.stockInfoData[i]['currentPrice'] = currentPrice
        this.stockInfoData[i]['yield'] = yieldData
        this.stockInfoData[i]['number'] = i+1

      });
      //this.allYield = SumYield.toFixed(2)
      this.tableRowData = new MatTableDataSource(this.stockInfoData);
      this.tableRowData.paginator = this.paginator;
    });
    this.actions$.pipe(ofType(Action.cmdTestFail)).pipe(take(1)).subscribe(async (result) => {
      this.stockInfoData.forEach((element,i) => {
        this.stockInfoData[i]['currentPrice'] = "0"
        this.stockInfoData[i]['yield'] = "0"
        this.stockInfoData[i]['number'] = i+1
      });
      this.tableRowData = new MatTableDataSource(this.stockInfoData);
      this.tableRowData.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }

  }


}
