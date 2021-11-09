import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticeEditComponent } from './admin-notice-edit.component';

describe('AdminNoticeEditComponent', () => {
  let component: AdminNoticeEditComponent;
  let fixture: ComponentFixture<AdminNoticeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoticeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNoticeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
