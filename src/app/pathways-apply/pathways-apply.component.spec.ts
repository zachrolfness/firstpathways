import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwaysApplyComponent } from './pathways-apply.component';

describe('PathwaysApplyComponent', () => {
  let component: PathwaysApplyComponent;
  let fixture: ComponentFixture<PathwaysApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathwaysApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwaysApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
