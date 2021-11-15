import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockModifyComponent } from './admin-stock-modify.component';

describe('AdminStockModifyComponent', () => {
  let component: AdminStockModifyComponent;
  let fixture: ComponentFixture<AdminStockModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStockModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
