import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminStockAddComponent } from '../dialog/admin-stock-add/admin-stock-add.component';
import { AdminStockModifyComponent } from '../dialog/admin-stock-modify/admin-stock-modify.component';
import { AdminStockRemoveComponent } from '../dialog/admin-stock-remove/admin-stock-remove.component';

export interface PeriodicElement {
	code : string;
	codename : string;
	price : string;
	purchase : string;
	profits : number;
	grouping : string;
	selling : string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {code: "290520", codename: '신도기연', price: "16,000원", purchase: '17,000원', profits: - 10.60, grouping:'관리자, 특별회원', selling: '0'},
  {code: "093320", codename: '케이아이엔엑스', price: "44,000원", purchase: '72,000원', profits: - 38.60, grouping:'전체', selling: '0'},
  {code: "102710", codename: '이엔에프테크놀로지', price: "29,000원", purchase: '44,000원', profits: - 34.60, grouping:'일반회원', selling: '0'},
  {code: "192440", codename: '슈피겐코리아', price: "48,000원", purchase: '62,500원', profits: - 22.60, grouping:'특별회원', selling: '0'},
  {code: "187870", codename: '디바이스이엔지', price: "30,400원", purchase: '38,100원', profits: - 20.20, grouping:'특별회원', selling: '0'},
  {code: "294090", codename: '이오플로우', price: "55,800원", purchase: '55,100원', profits: + 1.5, grouping:'일반회원', selling: '0'},
  {code: "200130", codename: '콜마비앤에이치', price: "35,800원", purchase: '49,100원', profits: - 29.10, grouping:'특별회원', selling: '0'},
  {code: "353200", codename: '대덕전자', price: "17,050원", purchase: '18,200원', profits: - 6.30, grouping:'전체', selling: '0'},
  {code: "030210", codename: 'KTB투자증권', price: "6,500원", purchase: '72,000원', profits: - 9.70, grouping:'관리자', selling: '0'},
  {code: "003530", codename: '한화투자증권', price: "5,800원", purchase: '4,780원', profits: + 23.00, grouping:'전체', selling: '0'},
  {code: "001450", codename: '현대해상', price: "28,800원", purchase: '25,200원', profits: + 11.30, grouping:'전체', selling: '0'},
  {code: "066970", codename: '엘엔에프', price: "214,400원", purchase: '185,500원', profits: + 16.60, grouping:'일반회원', selling: '0'},
  {code: "032640", codename: 'LG유플러스', price: "14,800원", purchase: '14,300원', profits: + 3.50, grouping:'특별회원', selling: '0'},
  {code: "096240", codename: '청담러닝', price: "31,800원", purchase: '27,200원', profits: + 14.40, grouping:'일반회원', selling: '0'},
  {code: "290524", codename: '신도기연', price: "16,000원", purchase: '17,000원', profits: - 10.60, grouping:'관리자, 특별회원', selling: '0'},
  {code: "093321", codename: '케이아이엔엑스', price: "44,000원", purchase: '72,000원', profits: - 38.60, grouping:'전체', selling: '0'},
  {code: "102711", codename: '이엔에프테크놀로지', price: "29,000원", purchase: '44,000원', profits: - 34.60, grouping:'일반회원', selling: '0'},
  {code: "192442", codename: '슈피겐코리아', price: "48,000원", purchase: '62,500원', profits: - 22.60, grouping:'특별회원', selling: '0'},
  {code: "187873", codename: '디바이스이엔지', price: "30,400원", purchase: '38,100원', profits: - 20.20, grouping:'특별회원', selling: '0'},
  {code: "294094", codename: '이오플로우', price: "55,800원", purchase: '55,100원', profits: + 1.5, grouping:'일반회원', selling: '0'},
  {code: "200135", codename: '콜마비앤에이치', price: "35,800원", purchase: '49,100원', profits: - 29.10, grouping:'특별회원', selling: '0'},
  {code: "353201", codename: '대덕전자', price: "17,050원", purchase: '18,200원', profits: - 6.30, grouping:'전체', selling: '0'},
  {code: "030212", codename: 'KTB투자증권', price: "6,500원", purchase: '72,000원', profits: - 9.70, grouping:'관리자', selling: '0'},
  {code: "003533", codename: '한화투자증권', price: "5,800원", purchase: '4,780원', profits: + 23.00, grouping:'전체', selling: '0'},
  {code: "001454", codename: '현대해상', price: "28,800원", purchase: '25,200원', profits: + 11.30, grouping:'전체', selling: '0'},
  {code: "066975", codename: '엘엔에프', price: "214,400원", purchase: '185,500원', profits: + 16.60, grouping:'일반회원', selling: '0'},
  {code: "032646", codename: 'LG유플러스', price: "14,800원", purchase: '14,300원', profits: + 3.50, grouping:'특별회원', selling: '0'},
  {code: "096247", codename: '청담러닝', price: "31,800원", purchase: '27,200원', profits: + 14.40, grouping:'일반회원', selling: '0'},


];

@Component({
  selector: 'app-admin-information',
  templateUrl: './admin-information.component.html',
  styleUrls: ['./admin-information.component.css']
})
export class AdminInformationComponent implements OnInit {

   constructor(
	private MatBottomSheet: MatBottomSheet,
			  ) { }

  ngOnInit(): void {

  }


  displayedColumns: string[] = ['select', 'code', 'codename', 'price', 'purchase', 'profits', 'grouping', 'selling', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
	selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.code + 1}`;
  }

  Stock_Add() {
    this.MatBottomSheet.open(AdminStockAddComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

  }

  Stock_Modify(data) {
    this.MatBottomSheet.open(AdminStockModifyComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

  }

  Stock_Remove(data) {
    this.MatBottomSheet.open(AdminStockRemoveComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

  }





}
