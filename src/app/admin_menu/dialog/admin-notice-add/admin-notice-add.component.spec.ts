import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticeAddComponent } from './admin-notice-add.component';

describe('AdminNoticeAddComponent', () => {
  let component: AdminNoticeAddComponent;
  let fixture: ComponentFixture<AdminNoticeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoticeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNoticeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
