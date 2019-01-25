import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaycakeComponent } from './displaycake.component';

describe('DisplaycakeComponent', () => {
  let component: DisplaycakeComponent;
  let fixture: ComponentFixture<DisplaycakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaycakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaycakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
