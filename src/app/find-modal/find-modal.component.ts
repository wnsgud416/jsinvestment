import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-find-modal',
  templateUrl: './find-modal.component.html',
  styleUrls: ['./find-modal.component.css']
})
export class FindModalComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<FindModalComponent>) { }

  ngOnInit(): void {
  }
	close(){
		this.bottomSheetRef.dismiss()
	}

}
