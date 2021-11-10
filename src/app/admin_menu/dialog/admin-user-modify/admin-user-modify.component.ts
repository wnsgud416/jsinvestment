import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-user-modify',
  templateUrl: './admin-user-modify.component.html',
  styleUrls: ['./admin-user-modify.component.css']
})
export class AdminUserModifyComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminUserModifyComponent>) { }

  ngOnInit(): void {
  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
