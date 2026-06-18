import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReceptionist } from './owner-receptionist';

describe('OwnerReceptionist', () => {
  let component: OwnerReceptionist;
  let fixture: ComponentFixture<OwnerReceptionist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerReceptionist],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerReceptionist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
