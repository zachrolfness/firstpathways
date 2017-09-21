import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwaysMapComponent } from './pathways-map.component';

describe('PathwaysMapComponent', () => {
  let component: PathwaysMapComponent;
  let fixture: ComponentFixture<PathwaysMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwaysMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwaysMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
