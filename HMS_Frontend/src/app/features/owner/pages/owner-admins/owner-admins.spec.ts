import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAdmins } from './owner-admins';

describe('OwnerAdmins', () => {
  let component: OwnerAdmins;
  let fixture: ComponentFixture<OwnerAdmins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAdmins],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerAdmins);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
