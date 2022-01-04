import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompletionRemoveComponent } from './user-completion-remove.component';

describe('UserCompletionRemoveComponent', () => {
  let component: UserCompletionRemoveComponent;
  let fixture: ComponentFixture<UserCompletionRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompletionRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompletionRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
