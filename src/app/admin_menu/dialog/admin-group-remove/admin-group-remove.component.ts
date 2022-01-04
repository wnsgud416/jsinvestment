import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from '@firebase/firestore';

@Component({
  selector: 'app-admin-group-remove',
  templateUrl: './admin-group-remove.component.html',
  styleUrls: ['./admin-group-remove.component.css']
})
export class AdminGroupRemoveComponent implements OnInit {

 constructor(private bottomSheetRef: MatBottomSheetRef<AdminGroupRemoveComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}
