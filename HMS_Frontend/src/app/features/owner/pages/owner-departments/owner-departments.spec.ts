import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerDepartments } from './owner-departments';

describe('OwnerDepartments', () => {
  let component: OwnerDepartments;
  let fixture: ComponentFixture<OwnerDepartments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerDepartments],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerDepartments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
