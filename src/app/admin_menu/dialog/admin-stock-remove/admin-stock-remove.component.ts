import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-stock-remove',
  templateUrl: './admin-stock-remove.component.html',
  styleUrls: ['./admin-stock-remove.component.css']
})
export class AdminStockRemoveComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminStockRemoveComponent>) { }

  ngOnInit(): void {
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}
