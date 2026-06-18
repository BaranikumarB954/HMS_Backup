import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApprovals } from './owner-approvals';

describe('OwnerApprovals', () => {
  let component: OwnerApprovals;
  let fixture: ComponentFixture<OwnerApprovals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerApprovals],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerApprovals);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
