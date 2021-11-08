import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompletionComponent } from './user-completion.component';

describe('UserCompletionComponent', () => {
  let component: UserCompletionComponent;
  let fixture: ComponentFixture<UserCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
