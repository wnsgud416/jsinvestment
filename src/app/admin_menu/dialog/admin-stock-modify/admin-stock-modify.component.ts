import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-stock-modify',
  templateUrl: './admin-stock-modify.component.html',
  styleUrls: ['./admin-stock-modify.component.css']
})
export class AdminStockModifyComponent implements OnInit {
	

	
	selectedObjects : any[];
	

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminStockModifyComponent>) { }

  ngOnInit(): void {
	  
	  this.selectedObjects = ['Group3'];
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }


}