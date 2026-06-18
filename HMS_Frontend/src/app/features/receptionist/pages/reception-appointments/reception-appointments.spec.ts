import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionAppointments } from './reception-appointments';

describe('ReceptionAppointments', () => {
  let component: ReceptionAppointments;
  let fixture: ComponentFixture<ReceptionAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionAppointments],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceptionAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
