import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticeModifyComponent } from './admin-notice-modify.component';

describe('AdminNoticeModifyComponent', () => {
  let component: AdminNoticeModifyComponent;
  let fixture: ComponentFixture<AdminNoticeModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoticeModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNoticeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
