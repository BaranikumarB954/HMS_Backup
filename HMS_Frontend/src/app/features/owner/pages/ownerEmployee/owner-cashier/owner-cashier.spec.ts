import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCashier } from './owner-cashier';

describe('OwnerCashier', () => {
  let component: OwnerCashier;
  let fixture: ComponentFixture<OwnerCashier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerCashier],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerCashier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
