import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-user-notice-detail',
  templateUrl: './user-notice-detail.component.html',
  styleUrls: ['./user-notice-detail.component.css']
})

export class UserNoticeDetailComponent implements OnInit {
 

  constructor(private bottomSheetRef: MatBottomSheetRef<UserNoticeDetailComponent>) { }

  ngOnInit(): void {
  }

	close() {
    this.bottomSheetRef.dismiss()
  }

}
