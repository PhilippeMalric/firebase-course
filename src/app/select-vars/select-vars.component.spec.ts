import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVarsComponent } from './select-vars.component';

describe('SelectVarsComponent', () => {
  let component: SelectVarsComponent;
  let fixture: ComponentFixture<SelectVarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
