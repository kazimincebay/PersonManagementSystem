import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetayGoruntuleComponent } from './detay-goruntule.component';

describe('DetayGoruntuleComponent', () => {
  let component: DetayGoruntuleComponent;
  let fixture: ComponentFixture<DetayGoruntuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetayGoruntuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetayGoruntuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
