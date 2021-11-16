import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-user-completion-detail',
  templateUrl: './user-completion-detail.component.html',
  styleUrls: ['./user-completion-detail.component.css']
})
export class UserCompletionDetailComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<UserCompletionDetailComponent>) { }

  ngOnInit(): void {
  }

	close() {
    this.bottomSheetRef.dismiss()
  }

}

