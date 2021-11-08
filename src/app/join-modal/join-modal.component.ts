import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.css']
})
export class JoinModalComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<JoinModalComponent>) { }
  hide = true;
  ngOnInit(): void {
  }

	close() {
    this.bottomSheetRef.dismiss()
  }
}
