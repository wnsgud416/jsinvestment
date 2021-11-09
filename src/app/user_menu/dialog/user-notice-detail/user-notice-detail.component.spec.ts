import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNoticeDetailComponent } from './user-notice-detail.component';

describe('UserNoticeDetailComponent', () => {
  let component: UserNoticeDetailComponent;
  let fixture: ComponentFixture<UserNoticeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNoticeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNoticeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
