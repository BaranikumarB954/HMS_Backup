import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerNurse } from './owner-nurse';

describe('OwnerNurse', () => {
  let component: OwnerNurse;
  let fixture: ComponentFixture<OwnerNurse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerNurse],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerNurse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
