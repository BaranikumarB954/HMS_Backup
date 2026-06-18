import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPatients } from './reception-patients';

describe('ReceptionPatients', () => {
  let component: ReceptionPatients;
  let fixture: ComponentFixture<ReceptionPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionPatients],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceptionPatients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
