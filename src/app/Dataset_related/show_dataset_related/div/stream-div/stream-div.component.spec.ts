import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamDivComponent } from './stream-div.component';

describe('StreamDivComponent', () => {
  let component: StreamDivComponent;
  let fixture: ComponentFixture<StreamDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
