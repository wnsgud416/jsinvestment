import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupModifyComponent } from './admin-group-modify.component';

describe('AdminGroupModifyComponent', () => {
  let component: AdminGroupModifyComponent;
  let fixture: ComponentFixture<AdminGroupModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
