import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserModifyComponent } from './admin-user-modify.component';

describe('AdminUserModifyComponent', () => {
  let component: AdminUserModifyComponent;
  let fixture: ComponentFixture<AdminUserModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
