import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempCardSmallComponent } from './temp-card-small.component';

describe('TempCardSmallComponent', () => {
  let component: TempCardSmallComponent;
  let fixture: ComponentFixture<TempCardSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempCardSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempCardSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
