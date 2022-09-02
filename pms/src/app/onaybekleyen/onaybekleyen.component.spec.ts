import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnaybekleyenComponent } from './onaybekleyen.component';

describe('OnaybekleyenComponent', () => {
  let component: OnaybekleyenComponent;
  let fixture: ComponentFixture<OnaybekleyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnaybekleyenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnaybekleyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
