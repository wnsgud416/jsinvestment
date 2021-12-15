import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-user-notice-detail',
  templateUrl: './user-notice-detail.component.html',
  styleUrls: ['./user-notice-detail.component.css']
})

export class UserNoticeDetailComponent implements OnInit {

  content
  constructor(private bottomSheetRef: MatBottomSheetRef<UserNoticeDetailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

  config: AngularEditorConfig = {
    editable: false,
    placeholder: '공지사항을 확인해주세요.',
    translate: 'no',
    showToolbar: false,

    defaultFontName: 'NotoSansKR',
  fonts: [
  {class: 'NotoSansKR', name: 'NotoSansKR'},

    ],

    toolbarHiddenButtons: [
      ['removeFormat' ,'fontSize']
      ],

  };


  ngOnInit(): void {
    this.content = this.data.content
    if (this.data.page === "community") {
      this.config.placeholder='게시물을 확인해주세요'
    }
  }

	close() {
    this.bottomSheetRef.dismiss()
  }

}
