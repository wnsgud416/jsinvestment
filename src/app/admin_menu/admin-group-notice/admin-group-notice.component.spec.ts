import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupNoticeComponent } from './admin-group-notice.component';

describe('AdminGroupNoticeComponent', () => {
  let component: AdminGroupNoticeComponent;
  let fixture: ComponentFixture<AdminGroupNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
