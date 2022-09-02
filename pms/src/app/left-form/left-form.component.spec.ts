import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftFormComponent } from './left-form.component';

describe('LeftFormComponent', () => {
  let component: LeftFormComponent;
  let fixture: ComponentFixture<LeftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
