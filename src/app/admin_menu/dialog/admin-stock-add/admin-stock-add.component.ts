import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-stock-add',
  templateUrl: './admin-stock-add.component.html',
  styleUrls: ['./admin-stock-add.component.css']
})
export class AdminStockAddComponent implements OnInit {

constructor(private bottomSheetRef: MatBottomSheetRef<AdminStockAddComponent>) { }

  ngOnInit(): void {
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}