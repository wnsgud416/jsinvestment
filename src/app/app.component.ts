import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { FindModalComponent } from './find-modal/find-modal.component';
import * as $ from 'jquery';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public IDText: any;
  public PasswordText: any;

  title = 'jsinvestment';
  hide = true;
  hide2 = true;
  hide3 = true;


  showFiller = false;



  constructor(
	private MatBottomSheet: MatBottomSheet,
    private router: Router,

  ){}

	Login(){
		$(".Login_Box").fadeOut(500);
    $(".Main_PanelBox").fadeIn(300);
    console.log(this.IDText);
    console.log(this.PasswordText);

    // this.store.dispatch(Action.login({ id: this.IDText, passwd: this.PasswordText }));
    // this.actions$.pipe(ofType(Action.loginSuccess)).pipe(take(1)).subscribe((data) => {
    //   console.log(data.result);
    //   if (data.result[0]) {
    //     this.session.setInfo(this.IDText);
    //     this.session.setAuth(data.result[0].menuAuth);
    //     this.router.navigate(['/UserNotice']);
    //     // this.store.dispatch(Action.menuAuth({ id: data.result[0].menuAuth }));
    //     // this.actions$.pipe(ofType(Action.menuAuthSuccess)).pipe(take(1)).subscribe((data) => {
    //     //   for(let i=0; i < data.result.length; i++){
    //     //     if(data.result[i] == "데이터 커넥션"){
    //     //       sessionStorage.setItem(data.result[i],"true");
    //     //     }else if(data.result[i] == "데이터 정제"){
    //     //       sessionStorage.setItem(data.result[i],"true");
    //     //     }else if(data.result[i] == "데이터 분석"){
    //     //       sessionStorage.setItem(data.result[i],"true");
    //     //     }else if(data.result[i] == "관리자"){
    //     //       sessionStorage.setItem(data.result[i],"true");
    //     //     }else if(data.result[i] == "카탈로그"){
    //     //       sessionStorage.setItem(data.result[i],"true");
    //     //     }else if(data.result[i] == "마이페이지"){
    //     //       sessionStorage.setItem(data.result[i],"true");
    //     //     }
    //     //   }
    //     //   // window.alert('BMSMetaweaver 로그인을 환영합니다');
    //     //   this.router.navigate(['/cleansing/table'])
    //     //     .then(() => {
    //     //     $("app-loading").show();
    //     //     window.location.reload();
    //     //   });

    //     //   console.log(data.result);
    //     // })
    //   } else {
    //     window.alert('아이디/비밀번호가 틀렸습니다.');
    //   }
    // });


	}

	UserMenu(MenuName: string){
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

	AdminMenu(MenuName: string){
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
