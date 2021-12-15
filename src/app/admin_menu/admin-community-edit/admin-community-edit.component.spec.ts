import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommunityEditComponent } from './admin-community-edit.component';

describe('AdminCommunityEditComponent', () => {
  let component: AdminCommunityEditComponent;
  let fixture: ComponentFixture<AdminCommunityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommunityEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommunityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
