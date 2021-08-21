import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg2Component } from './svg2.component';

describe('Svg1Component', () => {
  let component: Svg2Component;
  let fixture: ComponentFixture<Svg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Svg2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Svg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
