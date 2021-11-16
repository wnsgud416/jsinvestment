import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompletionDetailComponent } from './user-completion-detail.component';

describe('UserCompletionDetailComponent', () => {
  let component: UserCompletionDetailComponent;
  let fixture: ComponentFixture<UserCompletionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompletionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompletionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
