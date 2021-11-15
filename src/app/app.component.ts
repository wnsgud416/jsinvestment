import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { FindModalComponent } from './find-modal/find-modal.component';
import * as $ from 'jquery';
import { AppState } from './store';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { SessionService } from './service/sessionService';
import * as Action from './store/actions/action';
import { take } from 'rxjs';
import { Firestore, collectionData, collection, doc, getDoc } from '@angular/fire/firestore';
import { getDocs, query } from '@firebase/firestore';
import { browserSessionPersistence, getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth";
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public IDText: any;
  public PasswordText: any;
  public PasswordCheck
  @ViewChild('settings') settingsDrawer: MatDrawer;

  title = 'jsinvestment';
  hide = true;
  hide2 = true;
  hide3 = true;


  showFiller = false;

  loginSuccess = true;

  userEmail;
  userName;
  userPhone;

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private router: Router,
    private store: Store<AppState>,
    private actions$: Actions,
    private session: SessionService,
    private firestore: Firestore
  ){}

  ngOnInit(){
    // 로딩 필요
    const auth = getAuth();
    var user;

    setTimeout(() => {
      user = auth.currentUser;
      console.log(user);
      if (user ==null) {
        console.log("로그인 정보없음");
        this.loginSuccess = false;
        // this.router.navigate(['/']);
      } else {
        console.log("로그인 정보있음");
        this.loginSuccess = true;
        this.userEmail = user.email;
        if (user.displayName == undefined || user.displayName == null) {
          this.userName = ""
        } else {
          this.userName = user.displayName
        }
        if (user.phoneNumber == undefined || user.phoneNumber == null) {
          this.userPhone = ""
        } else {
          this.userPhone = user.phoneNumber
        }
        //this.router.navigate(['/UserNotice']);
      }
    }, 1000);


  }

	async Login(userid, password){

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return  signInWithEmailAndPassword(auth, userid, password)
      .then((userCredential) => {
        $(".Login_Box").fadeOut(500);
        $(".Main_PanelBox").fadeIn(300);
        console.log("지나감");

        console.log(userCredential.user);
        this.userEmail = userCredential.user.email;
        if (userCredential.user.displayName == undefined || userCredential.user.displayName == null) {
          this.userName = ""
        } else {
          this.userName = userCredential.user.displayName
        }
        if (userCredential.user.phoneNumber == undefined || userCredential.user.phoneNumber == null) {
          this.userPhone = ""
        } else {
          this.userPhone = userCredential.user.phoneNumber
        }
        console.log(userCredential.user.toJSON());


        this.router.navigate(['/UserNotice']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert('아이디나 비밀번호가 틀렸습니다.')
        this.router.navigate(['/']);
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert('잠시후 다시 시도해주세요.')
    });

    // var item = await getDocs(collection(this.firestore, 'users'));
    // item.forEach((doc) => {
    //   if(doc.id === userid){
    //     console.log("id맞음");

    //   }
    //   console.log(doc.id, " => ", doc.data());
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
  logout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.loginSuccess = false;
      window.alert('로그아웃을 완료했습니다.')
      this.settingsDrawer.close();
      this.router.navigate(['/']);
      window.location.reload()


    }).catch((error) => {
      // An error happened.
    });
  }

  passwdReSave() {
    console.log(this.PasswordText);
    console.log(this.PasswordCheck);
  }

  save() {
    console.log(this.userName);
    console.log(this.userPhone);
    const auth = getAuth();
    var user = auth.currentUser

  }

}
