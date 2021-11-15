import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-stock-add',
  templateUrl: './admin-stock-add.component.html',
  styleUrls: ['./admin-stock-add.component.css']
})
export class AdminStockAddComponent implements OnInit {

constructor(private bottomSheetRef: MatBottomSheetRef<AdminStockAddComponent>) { }
	
 selectedObjects : any[];

  ngOnInit(): void {	 
	  this.selectedObjects = ['Group0'];
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}