import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDoctor } from './owner-doctor';

describe('OwnerDoctor', () => {
  let component: OwnerDoctor;
  let fixture: ComponentFixture<OwnerDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerDoctor],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerDoctor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
