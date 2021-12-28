import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmoteCounterComponent } from './emote-counter.component';

describe('EmoteCounterComponent', () => {
  let component: EmoteCounterComponent;
  let fixture: ComponentFixture<EmoteCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmoteCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmoteCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
