import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCSV_mapComponent } from './load-csv_map.component';

describe('LoadCSVComponent', () => {
  let component: LoadCSV_mapComponent;
  let fixture: ComponentFixture<LoadCSV_mapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCSV_mapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCSV_mapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
