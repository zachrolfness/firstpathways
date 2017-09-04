import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcecardComponent } from './resourcecard.component';

describe('ResourcecardComponent', () => {
  let component: ResourcecardComponent;
  let fixture: ComponentFixture<ResourcecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
