import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTableComponent } from './right-table.component';

describe('RightTableComponent', () => {
  let component: RightTableComponent;
  let fixture: ComponentFixture<RightTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
