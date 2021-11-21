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
import { getDocs, query, updateDoc } from '@firebase/firestore';
import { browserSessionPersistence, getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithRedirect, signOut, updatePassword, updateProfile } from "firebase/auth";
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

  loginSuccess;

  user;
  userUid;
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
    setTimeout(async () => {
      this.user = auth.currentUser;

      console.log(this.user);
      if (this.user ==null) {
        this.loginSuccess = false;
        console.log("로그인 정보없음");
        window.alert('로그인이 필요합니다.')

        // this.router.navigate(['/']);
      } else {
        console.log("로그인 정보있음");
        this.loginSuccess = true;
        this.userUid = this.user.uid;
        this.userEmail = this.user.email;

        const docRef = doc(this.firestore, "users", this.userUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          if (docSnap.data()['name'] == undefined || docSnap.data()['name'] == null || docSnap.data()['name'] == "") {
            this.userName = ""
          } else {
            this.userName = docSnap.data()['name']
          }
          if (docSnap.data()['phone'] == undefined || docSnap.data()['phone'] == null || docSnap.data()['phone']== "") {
            this.userPhone = ""
          } else {
            this.userPhone = docSnap.data()['phone']
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        console.log(this.userName);
        console.log(this.userPhone);
        //this.router.navigate(['/UserNotice']);
      }
    }, 1000);


  }

	async Login(userid, password){

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return  signInWithEmailAndPassword(auth, userid, password)
      .then(async (userCredential) => {
        if(userCredential.user.emailVerified ==true){
          $(".Login_Box").fadeOut(500);
          $(".Main_PanelBox").fadeIn(300);
          console.log("지나감");

          console.log(userCredential.user);
          this.user = userCredential.user
          this.userUid = userCredential.user.uid;
          this.userEmail = userCredential.user.email;
          const docRef = doc(this.firestore, "users", this.userUid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            if (docSnap.data()['name'] == undefined || docSnap.data()['name'] == null || docSnap.data()['name'] == "") {
              this.userName = ""
            } else {
              this.userName = docSnap.data()['name']
            }
            if (docSnap.data()['phone'] == undefined || docSnap.data()['phone'] == null || docSnap.data()['phone']== "") {
              this.userPhone = ""
            } else {
              this.userPhone = docSnap.data()['phone']
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          console.log(userCredential.user.toJSON());


          this.router.navigate(['/UserNotice']);
        }else{
          window.alert('이메일 인증을 완료해주세요.')
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert('아이디나 비밀번호가 틀렸습니다.')
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
      window.location.reload()
      this.settingsDrawer.close();
      window.alert('로그아웃을 완료했습니다.')

    }).catch((error) => {
      // An error happened.
    });
  }

  passwdReSave() {
    const newPassword = this.PasswordCheck;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.userEmail, this.PasswordText)
      .then(async (userCredential) => {
        updatePassword(this.user, newPassword).then(() => {
          window.alert('비밀번호 수정을 완료했습니다.')
        }).catch((error) => {
          console.log(error);
          window.alert('비밀번호 수정중에 오류가 발생했습니다.')
        });
      })
      .catch((error) => {
        console.log(error);

        window.alert('현재 비밀번호가 틀렸습니다.')
      });

  }

  async save(userName,userPhone) {
    var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var hours = ('0' + today.getHours()).slice(-2);
      var minutes = ('0' + today.getMinutes()).slice(-2);
      var seconds = ('0' + today.getSeconds()).slice(-2);

      var dateTimeString = year + '-' + month  + '-' + day+' '+ hours + ':' + minutes  + ':' + seconds;

    const washingtonRef = doc(this.firestore, "users", this.userUid);

    await updateDoc(washingtonRef, {
      name: userName,
      phone : userPhone
    })
    .then(()=>{
      window.alert('정보 수정을 완료했습니다.')
    }).catch((error) =>{
      window.alert('정보 수정중에 오류가 발생했습니다.')
    })

  }

}
