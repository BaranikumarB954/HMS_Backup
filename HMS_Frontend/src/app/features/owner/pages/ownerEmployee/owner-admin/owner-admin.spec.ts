import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAdmin } from './owner-admin';

describe('OwnerAdmin', () => {
  let component: OwnerAdmin;
  let fixture: ComponentFixture<OwnerAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(OwnerAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
