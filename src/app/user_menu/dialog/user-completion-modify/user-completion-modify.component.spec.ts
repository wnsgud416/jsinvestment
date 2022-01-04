import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompletionModifyComponent } from './user-completion-modify.component';

describe('UserCompletionModifyComponent', () => {
  let component: UserCompletionModifyComponent;
  let fixture: ComponentFixture<UserCompletionModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompletionModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompletionModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
