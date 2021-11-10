import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminUserModifyComponent } from '../dialog/admin-user-modify/admin-user-modify.component';
import { AdminUserRemoveComponent } from '../dialog/admin-user-remove/admin-user-remove.component';

@Component({
  selector: 'app-admin-group-edit',
  templateUrl: './admin-group-edit.component.html',
  styleUrls: ['./admin-group-edit.component.css']
})

export class AdminGroupEditComponent implements OnInit {

  constructor(
	private MatBottomSheet: MatBottomSheet,
			  ) { }

  ngOnInit(): void {

  }
	User_Remove(){
	  this.MatBottomSheet.open(AdminUserRemoveComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

  }

  User_Edit(){
	  this.MatBottomSheet.open(AdminUserModifyComponent, {
      panelClass: 'OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

	}

}
