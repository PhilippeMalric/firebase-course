import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCSVComponent } from './load-csv.component';

describe('LoadCSVComponent', () => {
  let component: LoadCSVComponent;
  let fixture: ComponentFixture<LoadCSVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCSVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
