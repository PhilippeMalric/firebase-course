import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCSV_ddComponent } from './load-csv_dd.component';

describe('LoadCSVComponent', () => {
  let component: LoadCSV_ddComponent;
  let fixture: ComponentFixture<LoadCSV_ddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCSV_ddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCSV_ddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
