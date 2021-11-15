import { TestpageComponent } from './testpage/testpage.component';
import { UserNoticeComponent } from './user_menu/user-notice/user-notice.component';
import { UserRecommendedComponent } from './user_menu/user-recommended/user-recommended.component';
import { UserCompletionComponent } from './user_menu/user-completion/user-completion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminInformationComponent } from './admin_menu/admin-information/admin-information.component';
import { AdminNoticeEditComponent } from './admin_menu/admin-notice-edit/admin-notice-edit.component';
import { AdminGroupNoticeComponent } from './admin_menu/admin-group-notice/admin-group-notice.component';
import { AdminGroupEditComponent } from './admin_menu/admin-group-edit/admin-group-edit.component';
import { AdminUserEditComponent } from './admin_menu/admin-user-edit/admin-user-edit.component';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'testpage', component: TestpageComponent },
  { path: 'UserNotice', component: UserNoticeComponent },
  { path: 'UserRecommended', component: UserRecommendedComponent },
  { path: 'UserCompletion', component: UserCompletionComponent },
  { path: 'AdminInformation', component: AdminInformationComponent },
  { path: 'AdminNoticeEdit', component: AdminNoticeEditComponent },
  { path: 'AdminGroupNotice', component: AdminGroupNoticeComponent },
  { path: 'AdminGroupEdit', component: AdminGroupEditComponent },
  { path: 'AdminUserEdit', component: AdminUserEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
