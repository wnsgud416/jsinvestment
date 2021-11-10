import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-user-remove',
  templateUrl: './admin-user-remove.component.html',
  styleUrls: ['./admin-user-remove.component.css']
})

export class AdminUserRemoveComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminUserRemoveComponent>) { }

  ngOnInit(): void {
  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
