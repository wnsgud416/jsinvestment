import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-notice-add',
  templateUrl: './admin-notice-add.component.html',
  styleUrls: ['./admin-notice-add.component.css']
})
export class AdminNoticeAddComponent implements OnInit {
	
  htmlContent = '';

  constructor(private bottomSheetRef: MatBottomSheetRef<AdminNoticeAddComponent>) { }

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
	
	
	close() {
    this.bottomSheetRef.dismiss()
  }

}
