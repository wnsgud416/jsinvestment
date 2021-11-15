import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStockRemoveComponent } from './admin-stock-remove.component';

describe('AdminStockRemoveComponent', () => {
  let component: AdminStockRemoveComponent;
  let fixture: ComponentFixture<AdminStockRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStockRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStockRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
