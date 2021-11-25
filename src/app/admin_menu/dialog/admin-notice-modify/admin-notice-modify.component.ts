import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { doc, updateDoc } from '@firebase/firestore';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-admin-notice-modify',
  templateUrl: './admin-notice-modify.component.html',
  styleUrls: ['./admin-notice-modify.component.css']
})
export class AdminNoticeModifyComponent implements OnInit {

  classification
  title
  content =''
  constructor(private bottomSheetRef: MatBottomSheetRef<AdminNoticeModifyComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private firestore: Firestore,
    ) { }

  ngOnInit(): void {
    this.classification = this.data.classification
    this.title = this.data.title
    this.content = this.data.content
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

  async save(){
    var today = new Date();

      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);


      var dateTimeString = year + '-' + month  + '-' + day;

    const washingtonRef = doc(this.firestore, "notices/public/posts", this.data.id);

    await updateDoc(washingtonRef, {
      classification: this.classification,
      content : this.content,
      title: this.title,
      updated_at:dateTimeString
    })
    .then(()=>{
      window.alert('공지사항 수정을 완료했습니다.')
      this.bottomSheetRef.dismiss()
    }).catch((error) =>{
      window.alert('공지사항 수정중에 오류가 발생했습니다.')
    })
  }
	close() {
    this.bottomSheetRef.dismiss()
  }

}
