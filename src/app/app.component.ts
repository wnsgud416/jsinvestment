import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { FindModalComponent } from './find-modal/find-modal.component';
import * as $ from 'jquery';

import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public IDText;
  public PasswordText;

  title = 'jsinvestment';
  hide = true;
  hide2 = true;
  hide3 = true;


  showFiller = false;



  constructor(
	private MatBottomSheet: MatBottomSheet,
    private router: Router
  ){}

	Login(){
		$(".Login_Box").fadeOut(500);
		$(".Main_PanelBox").fadeIn(300);
		this.router.navigate(['/UserNotice']);
	}
	
	UserMenu(MenuName){
		if(MenuName == "notice"){
		this.router.navigate(['/UserNotice']);
		$(".mat-drawer-backdrop").click();
		}

		else if(MenuName == "recommend"){
		this.router.navigate(['/UserRecommended']);
		$(".mat-drawer-backdrop").click();
		}
		
		else if(MenuName == "completion"){
		this.router.navigate(['/UserCompletion']);
		$(".mat-drawer-backdrop").click();
		}
	}
	
	AdminMenu(MenuName){
		if(MenuName == "info"){
		this.router.navigate(['/AdminInformation']);
		$(".mat-drawer-backdrop").click();
		}

		else if(MenuName == "notice"){
		this.router.navigate(['/AdminNoticeEdit']);
		$(".mat-drawer-backdrop").click();
		}
		
		else if(MenuName == "groupnotice"){
		this.router.navigate(['/AdminGroupNotice']);
		$(".mat-drawer-backdrop").click();
		}
		
		else if(MenuName == "groupedit"){
		this.router.navigate(['/AdminGroupEdit']);
		$(".mat-drawer-backdrop").click();
		}
		
		else if(MenuName == "useredit"){
		this.router.navigate(['/AdminUserEdit']);
		$(".mat-drawer-backdrop").click();
		}
	}








  Join() {
	  this.MatBottomSheet.open(JoinModalComponent, {
      panelClass: 'Login_OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });

  }
  Find_Info(){
    this.MatBottomSheet.open(FindModalComponent, {
      panelClass: 'Login_OptionModal',
      data: {}
    }).afterDismissed().subscribe((result) => {

    });
  }
}
