import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupRemoveComponent } from './admin-group-remove.component';

describe('AdminGroupRemoveComponent', () => {
  let component: AdminGroupRemoveComponent;
  let fixture: ComponentFixture<AdminGroupRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
