import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  Code: string;
  CodeName: string;
  Buying: string;
  Selling: string;
  Number: number;
  Data: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {Code:'86670',CodeName:'비앤티',Buying:'9,790',Selling:'10,100',Number: 3.20,Data:'3일',},
  {Code:'267320',CodeName:'나인테크',Buying:'42,50',Selling:'4,460',Number: 4.90,Data:'11.23~24',},
  {Code:'100130',CodeName:'동국S&C',Buying:'8,450',Selling:'8,661',Number: 2.50,Data:'11.23~24',},
  {Code:'21080',CodeName:'에이티넘인베스트',Buying:'2,690',Selling:'3,012',Number: 12.00,Data:'11.23~24',},
  {Code:'37350',CodeName:'성도이엔지',Buying:'4,100',Selling:'4,245',Number: 3.50,Data:'11.24~25',},
  {Code:'86670',CodeName:'비앤티',Buying:'9,700',Selling:'10,700',Number: 9.30,Data:'11.20~25',},
  {Code:'003850',CodeName:'보령제약',Buying:'15,000',Selling:'20,500',Number: 36.70,Data:'2달',},
  {Code:'299030',CodeName:'하나기술',Buying:'86,500',Selling:'97,600',Number: 12.80,Data:'11.25~26',},
  {Code:'006740',CodeName:'영풍제지',Buying:'4,615',Selling:'4,790',Number: 3.80,Data:'11.25~26',},
  {Code:'100130',CodeName:'동국S&C',Buying:'8,260',Selling:'8,570',Number: 3.80,Data:'11.23~26',},
  {Code:'86670',CodeName:'비앤티',Buying:'9,790',Selling:'10,100',Number: 3.20,Data:'3일',},
  {Code:'267320',CodeName:'나인테크',Buying:'42,50',Selling:'4,460',Number: 4.90,Data:'11.23~24',},
  {Code:'100130',CodeName:'동국S&C',Buying:'8,450',Selling:'8,661',Number: 2.50,Data:'11.23~24',},
  {Code:'21080',CodeName:'에이티넘인베스트',Buying:'2,690',Selling:'3,012',Number: 12.00,Data:'11.23~24',},
  {Code:'37350',CodeName:'성도이엔지',Buying:'4,100',Selling:'4,245',Number: 3.50,Data:'11.24~25',},
  {Code:'86670',CodeName:'비앤티',Buying:'9,700',Selling:'10,700',Number: 9.30,Data:'11.20~25',},
  {Code:'003850',CodeName:'보령제약',Buying:'15,000',Selling:'20,500',Number: 36.70,Data:'2달',},
  {Code:'299030',CodeName:'하나기술',Buying:'86,500',Selling:'97,600',Number: 12.80,Data:'11.25~26',},
  {Code:'006740',CodeName:'영풍제지',Buying:'4,615',Selling:'4,790',Number: 3.80,Data:'11.25~26',},
  {Code:'100130',CodeName:'동국S&C',Buying:'8,260',Selling:'8,570',Number: 3.80,Data:'11.23~26',},

];

@Component({
  selector: 'app-user-completion-detail',
  templateUrl: './user-completion-detail.component.html',
  styleUrls: ['./user-completion-detail.component.css']
})

export class UserCompletionDetailComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<UserCompletionDetailComponent>) { }

  displayedColumns: string[] = ['Code','CodeName', 'Buying', 'Selling', 'Number', 'Data'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);




  ngOnInit(): void {

  }

	close() {
    this.bottomSheetRef.dismiss()
  }

}

