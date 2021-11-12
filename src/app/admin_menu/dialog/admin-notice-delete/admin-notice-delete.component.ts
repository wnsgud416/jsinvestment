import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-notice-delete',
  templateUrl: './admin-notice-delete.component.html',
  styleUrls: ['./admin-notice-delete.component.css']
})
export class AdminNoticeDeleteComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminNoticeDeleteComponent>) { }

  ngOnInit(): void {
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}
