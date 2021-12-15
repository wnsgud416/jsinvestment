import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommunityComponent } from './user-community.component';

describe('UserCommunityComponent', () => {
  let component: UserCommunityComponent;
  let fixture: ComponentFixture<UserCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
