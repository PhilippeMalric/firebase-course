import { ComponentFixture, TestBed } from '@angular/core/testing';

import { myTableComponent } from './mytable.component';

describe('PlotlyExampleComponent', () => {
  let component: myTableComponent;
  let fixture: ComponentFixture<myTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ myTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(myTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
