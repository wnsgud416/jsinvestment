import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockAddComponent } from './admin-stock-add.component';

describe('AdminStockAddComponent', () => {
  let component: AdminStockAddComponent;
  let fixture: ComponentFixture<AdminStockAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStockAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
