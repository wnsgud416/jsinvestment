import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticeDeleteComponent } from './admin-notice-delete.component';

describe('AdminNoticeDeleteComponent', () => {
  let component: AdminNoticeDeleteComponent;
  let fixture: ComponentFixture<AdminNoticeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoticeDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNoticeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
