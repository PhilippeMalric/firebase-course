import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDivComponent } from './data-div.component';

describe('DataDivComponent', () => {
  let component: DataDivComponent;
  let fixture: ComponentFixture<DataDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
