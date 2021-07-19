import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewTestComponent } from './data-view-test.component';

describe('DataViewTestComponent', () => {
  let component: DataViewTestComponent;
  let fixture: ComponentFixture<DataViewTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataViewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
