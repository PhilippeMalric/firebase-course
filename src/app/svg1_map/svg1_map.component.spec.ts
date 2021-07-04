import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Svg1_mapComponent } from './svg1_map.component';

describe('Svg1Component', () => {
  let component: Svg1_mapComponent;
  let fixture: ComponentFixture<Svg1_mapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Svg1_mapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Svg1_mapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
