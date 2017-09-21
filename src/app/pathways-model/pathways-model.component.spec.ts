import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwaysModelComponent } from './pathways-model.component';

describe('PathwaysModelComponent', () => {
  let component: PathwaysModelComponent;
  let fixture: ComponentFixture<PathwaysModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwaysModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwaysModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
