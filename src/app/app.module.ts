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


// ngrx 관련
// import {EffectsModule} from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import {reducers, metaReducers} from './store'
// import { DataSourceEffects } from './store/effects/effect'
// import {StoreDevtoolsModule} from '@ngrx/store-devtools';
// import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent,
    JoinModalComponent,
    FindModalComponent,
    UserNoticeComponent,
    UserRecommendedComponent,
    UserCompletionComponent
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

    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true,
    //     strictStateSerializability: true,
    //     strictActionSerializability: true,
    //     strictActionWithinNgZone: true,
    //     strictActionTypeUniqueness: true,
    //   },
    // }),
    //   EffectsModule.forRoot([DataSourceEffects]),
    //   StoreDevtoolsModule.instrument({
    //     maxAge: 25,
    //     logOnly: environment.production,
    //   }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
