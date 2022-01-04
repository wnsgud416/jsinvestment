import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-admin-group-modify',
  templateUrl: './admin-group-modify.component.html',
  styleUrls: ['./admin-group-modify.component.css']
})
export class AdminGroupModifyComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminGroupModifyComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}
