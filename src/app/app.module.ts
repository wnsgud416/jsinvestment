import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestpageComponent } from './testpage/testpage.component';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { FindModalComponent } from './find-modal/find-modal.component';
import { UserNoticeComponent } from './user_menu/user-notice/user-notice.component';
import { UserRecommendedComponent } from './user_menu/user-recommended/user-recommended.component';
import { UserCompletionComponent } from './user_menu/user-completion/user-completion.component';
import { UserNoticeDetailComponent } from './user_menu/dialog/user-notice-detail/user-notice-detail.component';
import { AdminInformationComponent } from './admin_menu/admin-information/admin-information.component';
import { AdminNoticeEditComponent } from './admin_menu/admin-notice-edit/admin-notice-edit.component';
import { AdminGroupNoticeComponent } from './admin_menu/admin-group-notice/admin-group-notice.component';
import { AdminGroupEditComponent } from './admin_menu/admin-group-edit/admin-group-edit.component';
import { AdminUserEditComponent } from './admin_menu/admin-user-edit/admin-user-edit.component';
import { AdminUserRemoveComponent } from './admin_menu/dialog/admin-user-remove/admin-user-remove.component';
import { AdminUserModifyComponent } from './admin_menu/dialog/admin-user-modify/admin-user-modify.component';
import { AdminNoticeAddComponent } from './admin_menu/dialog/admin-notice-add/admin-notice-add.component';
import { AdminNoticeDeleteComponent } from './admin_menu/dialog/admin-notice-delete/admin-notice-delete.component';
import { AdminNoticeModifyComponent } from './admin_menu/dialog/admin-notice-modify/admin-notice-modify.component';


// Angular Meterial
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';


/*CDK Module*/
import {TextFieldModule} from '@angular/cdk/text-field';

/*Angular Editor*/
import { HttpClientModule,HttpClient} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


// ngrx 관련
import {EffectsModule} from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducers, metaReducers} from './store'
import { StoreEffects } from './store/effects/effect'
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent,
    JoinModalComponent,
    FindModalComponent,
    UserNoticeComponent,
    UserRecommendedComponent,
    UserCompletionComponent,
    UserNoticeDetailComponent,
    AdminInformationComponent,
    AdminNoticeEditComponent,
    AdminGroupNoticeComponent,
    AdminGroupEditComponent,
    AdminUserEditComponent,
    AdminUserRemoveComponent,
    AdminUserModifyComponent,
    AdminNoticeAddComponent,
    AdminNoticeDeleteComponent,
    AdminNoticeModifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    TextFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatBadgeModule,
    HttpClientModule,
    AngularEditorModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    //EffectsModule.forFeature([StoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

  ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
