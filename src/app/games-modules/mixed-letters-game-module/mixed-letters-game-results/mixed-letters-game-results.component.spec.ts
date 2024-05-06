import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLettersGameResultsComponent } from './mixed-letters-game-results.component';

describe('MixedLettersGameResultsComponent', () => {
  let component: MixedLettersGameResultsComponent;
  let fixture: ComponentFixture<MixedLettersGameResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLettersGameResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLettersGameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
