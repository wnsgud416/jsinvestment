import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import * as $ from 'jquery';

export interface PeriodicElement {
	number : number;
	code : string;
	codename : string;
	price : string;
	purchase : string;
	profits : number;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {number: 1,code: "290520", codename: '신도기연', price: "16,000원", purchase: '17,000원', profits: - 10.60},
  {number: 2,code: "093320", codename: '케이아이엔엑스', price: "44,000원", purchase: '72,000원', profits: - 38.60},
  {number: 3,code: "102710", codename: '이엔에프테크놀로지', price: "29,000원", purchase: '44,000원', profits: - 34.60},
  {number: 4,code: "192440", codename: '슈피겐코리아', price: "48,000원", purchase: '62,500원', profits: - 22.60},
  {number: 5,code: "187870", codename: '디바이스이엔지', price: "30,400원", purchase: '38,100원', profits: - 20.20},
  {number: 6,code: "294090", codename: '이오플로우', price: "55,800원", purchase: '55,100원', profits: + 1.5},
  {number: 7,code: "200130", codename: '콜마비앤에이치', price: "35,800원", purchase: '49,100원', profits: - 29.10},
  {number: 8,code: "353200", codename: '대덕전자', price: "17,050원", purchase: '18,200원', profits: - 6.30},
  {number: 9,code: "030210", codename: 'KTB투자증권', price: "6,500원", purchase: '72,000원', profits: - 9.70},
  {number: 10,code: "003530", codename: '한화투자증권', price: "5,800원", purchase: '4,780원', profits: + 23.00},
  {number: 11,code: "001450", codename: '현대해상', price: "28,800원", purchase: '25,200원', profits: + 11.30},
  {number: 12,code: "066970", codename: '엘엔에프', price: "214,400원", purchase: '185,500원', profits: + 16.60},
  {number: 13,code: "032640", codename: 'LG유플러스', price: "14,800원", purchase: '14,300원', profits: + 3.50},
  {number: 14,code: "096240", codename: '청담러닝', price: "31,800원", purchase: '27,200원', profits: + 14.40},
  {number: 15,code: "290524", codename: '신도기연', price: "16,000원", purchase: '17,000원', profits: - 10.60},
  {number: 16,code: "093321", codename: '케이아이엔엑스', price: "44,000원", purchase: '72,000원', profits: - 38.60},
  {number: 17,code: "102711", codename: '이엔에프테크놀로지', price: "29,000원", purchase: '44,000원', profits: - 34.60},
  {number: 18,code: "192442", codename: '슈피겐코리아', price: "48,000원", purchase: '62,500원', profits: - 22.60},
  {number: 19,code: "187873", codename: '디바이스이엔지', price: "30,400원", purchase: '38,100원', profits: - 20.20},
  {number: 20,code: "294094", codename: '이오플로우', price: "55,800원", purchase: '55,100원', profits: + 1.5},
  {number: 21,code: "200135", codename: '콜마비앤에이치', price: "35,800원", purchase: '49,100원', profits: - 29.10},
  {number: 22,code: "353201", codename: '대덕전자', price: "17,050원", purchase: '18,200원', profits: - 6.30},
  {number: 23,code: "030212", codename: 'KTB투자증권', price: "6,500원", purchase: '72,000원', profits: - 9.70},
  {number: 24,code: "003533", codename: '한화투자증권', price: "5,800원", purchase: '4,780원', profits: + 23.00},
  {number: 25,code: "001454", codename: '현대해상', price: "28,800원", purchase: '25,200원', profits: + 11.30},
  {number: 26,code: "066975", codename: '엘엔에프', price: "214,400원", purchase: '185,500원', profits: + 16.60},
  {number: 27,code: "032646", codename: 'LG유플러스', price: "14,800원", purchase: '14,300원', profits: + 3.50},
  {number: 28,code: "096247", codename: '청담러닝', price: "31,800원", purchase: '27,200원', profits: + 14.40},


];


@Component({
  selector: 'app-user-recommended',
  templateUrl: './user-recommended.component.html',
  styleUrls: ['./user-recommended.component.css']
})
export class UserRecommendedComponent implements OnInit {
	
@ViewChild(MatPaginator) paginator: MatPaginator;

	
 constructor( ) { }

  ngOnInit(): void {
	  
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
    this.dataSource.paginator = this.paginator;
  }


  displayedColumns: string[] = ['number','code', 'codename', 'price', 'purchase', 'profits'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);



 

}
