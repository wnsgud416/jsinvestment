import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockSellComponent } from './admin-stock-sell.component';

describe('AdminStockSellComponent', () => {
  let component: AdminStockSellComponent;
  let fixture: ComponentFixture<AdminStockSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStockSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
