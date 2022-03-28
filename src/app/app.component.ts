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
import { Firestore, collectionData, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { getDocs, query, updateDoc } from '@firebase/firestore';
import { browserSessionPersistence, getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithRedirect, signOut, updatePassword, updateProfile } from "firebase/auth";
import { MatDrawer } from '@angular/material/sidenav';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  userGroup = "";
  refresh;
  notificationOnOff;
  screan_height;
  onScroll;

  constructor(
    private MatBottomSheet: MatBottomSheet,
    private router: Router,
    private store: Store<AppState>,
    private actions$: Actions,
    private session: SessionService,
    private firestore: Firestore,
    private MatSnackBar: MatSnackBar
  ){}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.firebaseAction()
  }
  async ngOnInit(){
	  window.addEventListener('scroll', this.onScroll);

	 this.screan_height = window.innerHeight

	  /*모바일 및 웹 구분*/
	var OS_Chack = navigator.userAgent.toLowerCase();
	 //console.log(navigator.userAgent.toLowerCase())

	if(OS_Chack.indexOf("android") !== -1){
		// android 일 때
		//console.log("android")
		document.body.style.setProperty('--full-screan',this.screan_height + 'px');
	}
	  else if(OS_Chack.indexOf("iphone") > -1 || OS_Chack.indexOf("ipad") > -1 || OS_Chack.indexOf("ipod") > -1 || OS_Chack.indexOf("macintosh") > -1){
		  //console.log("ios")
		// iphone 일 때
		if(OS_Chack.indexOf("macintosh") > -1){
			//console.log("macintosh")
			document.body.style.setProperty('--full-screan',this.screan_height + 'px');
			$(".OS_boot").addClass("os_iphone");
			window.addEventListener("load",function() {
				// Set a timeout...
				setTimeout(function(){
					// Hide the address bar!
					window.scrollTo(0, 1);
				}, 0);
			});

		}
		else{

		document.body.style.setProperty('--full-screan',this.screan_height + 'px');
		$(".OS_boot").addClass("os_ios");
		window.addEventListener("load",function() {
			// Set a timeout...
			setTimeout(function(){
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);
		});
			}

	}
	  else if(OS_Chack.indexOf("mac") > -1 && OS_Chack.indexOf("safari") > -1){
		  //console.log("safari")
		  document.body.style.setProperty('--full-screan',this.screan_height + 'px');
		  $(".OS_boot").addClass("os_ios");
		window.addEventListener("load",function() {
			// Set a timeout...
			setTimeout(function(){
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);
		});
	  }
	  else if(OS_Chack.indexOf("windows") !== -1){
		  //console.log("windows")

	  }

	  else{
		  //console.log("etc")
	  }



    // 로딩 필요

    await getDoc(doc(this.firestore, "admin", "reflashStock")).then(async (docData) => {
      var docValue :any = docData.data()
      this.refresh = docValue['value']

    });
    const auth = await getAuth();
    this.user = auth.currentUser;

    if (this.user ==null) {
      this.loginSuccess = false;
      // window.alert('로그인이 필요합니다.')

      // this.router.navigate(['/']);
    } else {
      $(".Main_PanelBox").fadeIn(0);

      this.loginSuccess = true;
      this.userUid = this.user.uid;
      this.userEmail = this.user.email;

      const docRef = doc(this.firestore, "users", this.userUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.notificationOnOff = docSnap.data()['notification_onoff']
        this.userGroup = docSnap.data()['group']
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
      }
      //this.router.navigate(['/UserNotice']);
    }


  }

	async Login(userid, password){

    const auth = await getAuth();
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return  signInWithEmailAndPassword(auth, userid, password)
      .then(async (userCredential) => {
        if(userCredential.user.emailVerified ==true){

          this.user = userCredential.user
          this.userUid = userCredential.user.uid;
          this.userEmail = userCredential.user.email;
          const docRef = doc(this.firestore, "users", this.userUid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.notificationOnOff = docSnap.data()['notification_onoff']
            this.userGroup = docSnap.data()['group']
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
          }
          var docData:any = docSnap.data();

          var today = new Date();

          var year = today.getFullYear();
          var month = ('0' + (today.getMonth() + 1)).slice(-2);
          var day = ('0' + today.getDate()).slice(-2);

          var dateString = year + '-' + month + '-' + day

          var saveDate = new Date(docData['updated_at']);
          var now = new Date(dateString);
          if (now > saveDate) {
            await updateDoc(docRef, {
              updated_at: "일반회원",
              group: "일반회원"
            })
            window.alert('구독이 만료되었습니다. 일반회원으로 변경됩니다.')
            this.userGroup = "일반회원";
            $(".Login_Box").fadeOut(500);
            $(".Main_PanelBox").fadeIn(300);
            this.router.navigate(['/UserNotice']);
          } else {
            $(".Login_Box").fadeOut(500);
            $(".Main_PanelBox").fadeIn(300);
            this.router.navigate(['/UserNotice']);
          }

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

	}

	UserMenu(MenuName: string){
		if(MenuName == "notice"){
		this.router.navigate(['/UserNotice']);
		$(".mat-drawer-backdrop").click();
    }
    else if(MenuName == "community"){
      this.router.navigate(['/UserCommunity']);
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

    else if(MenuName == "community"){
    this.router.navigate(['/AdminCommunityEdit']);
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
          window.alert('비밀번호 수정중에 오류가 발생했습니다.')
        });
      })
      .catch((error) => {
        window.alert('현재 비밀번호가 틀렸습니다.')
      });

  }

  async save(userName,userPhone) {
    var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);

      var dateTimeString = year + '-' + month  + '-' + day

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
  async reFrashSave() {
    if (this.refresh == undefined) {
      window.alert('리프레시 값을 입력해주세요.')
    } else {
      await setDoc(doc(this.firestore, "admin", "reflashStock"), {
        value : this.refresh
      }).then(() => {
        window.alert('리프레시 값을 설정했습니다.')
      })
    }


  }

  firebaseAction() {
    const messaging = getMessaging();
    onMessage(messaging, (payload:any) => {
      var text: any = payload.notification.body;

      this.MatSnackBar.open(text, "확인", {
        horizontalPosition: "right",
        verticalPosition: "bottom",
        duration: 20000,
      });
    });

  }

  async notificationToggle(event) {
    const washingtonRef = doc(this.firestore, "users", this.userUid);

    await updateDoc(washingtonRef, {
      notification_onoff: event.checked,
    })

  }
  async notificationSetting(item) {
    if (item === 'android') {
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: 'BDOosaQYQY_sitFae-VLhiQtXhuj_UeFKaqqRd-_KFLBoZOMKobWGjhE9SJOK9uXN6aorTl0JcyDoe1Smls95zU' }).then(async (currentToken) => {
      if (currentToken) {
        const washingtonRef = doc(this.firestore, "users", this.userUid);

        await updateDoc(washingtonRef, {
          notification_token: currentToken,
        }).then(() => {
          window.alert('안드로이드 / WEB으로 알람을 설정했습니다.')
        })
      }
    }).catch((err) => {
    });
    }
    // else {
    //   const washingtonRef = doc(this.firestore, "users", this.userUid);

    //     await updateDoc(washingtonRef, {
    //       notification_token: "ios",
    //     }).then(() => {
    //       window.alert('IOS 기기로 알람을 설정했습니다.')
    //     })
    // }


  }

}
