import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { getAuth } from '@firebase/auth';
import { collection, doc, getDoc, setDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-notice-add',
  templateUrl: './admin-notice-add.component.html',
  styleUrls: ['./admin-notice-add.component.css']
})
export class AdminNoticeAddComponent implements OnInit {

  htmlContent = '';
  classification;
  title;

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminNoticeAddComponent>,
    private firestore: Firestore,

    ) { }

  ngOnInit(): void {


  }

	config: AngularEditorConfig = {
    editable: true,
    placeholder: '공지사항을 작성해주세요.',
    translate: 'yes',

    defaultFontName: 'NotoSansKR',
	fonts: [
	{class: 'NotoSansKR', name: 'NotoSansKR'},

  	],

    toolbarHiddenButtons: [
      ['removeFormat' ,'fontSize']
      ],

  };

  async add(){
    const auth = getAuth();
    var userData:any =auth.currentUser
    const docRef = doc(this.firestore, "users", userData?.uid);
    const docSnap:any = await getDoc(docRef);

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day

    console.log(this.classification);
    console.log(this.title);
    console.log(this.htmlContent);
    const newCityRef = doc(collection(this.firestore, "/notices/public/posts"));
    var data ={
      author: docSnap.data()['name'],
      author_id: auth.currentUser?.uid,
      classification:this.classification,
      content: this.htmlContent,
      contents: "",
      created_at: dateString,
      id: newCityRef.id,
      num: "",
      title: this.title,
      updated_at: dateString
    }
    await setDoc(newCityRef, data).then(()=>{
      window.alert('공지사항 작성을 완료했습니다.')
      this.bottomSheetRef.dismiss()
    }).catch((error)=>{
      window.alert('공지사항 작성중에 오류가 발생했습니다.')
    });
  }

	close() {
    this.bottomSheetRef.dismiss()
  }


}
