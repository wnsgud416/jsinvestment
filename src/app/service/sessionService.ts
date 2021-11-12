import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router:Router) { }

  setInfo(userId) {
    sessionStorage.setItem('id', userId);
  }

  getInfo(){
    return sessionStorage.getItem('id');
  }

  setAuth(menuAuth){
    sessionStorage.setItem('menuAuth', menuAuth);
  }

  getAuth(){
    return sessionStorage.getItem('menuAuth');
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
    window.alert('로그아웃 되었습니다.')
  }
}
