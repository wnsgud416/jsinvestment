import { TestpageComponent } from './testpage/testpage.component';
import { UserNoticeComponent } from './user_menu/user-notice/user-notice.component';
import { UserRecommendedComponent } from './user_menu/user-recommended/user-recommended.component';
import { UserCompletionComponent } from './user_menu/user-completion/user-completion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'testpage', component: TestpageComponent },
  { path: 'UserNotice', component: UserNoticeComponent },
  { path: 'UserRecommended', component: UserRecommendedComponent },
  { path: 'UserCompletion', component: UserCompletionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
