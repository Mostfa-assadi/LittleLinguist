import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSorterGameResultsComponent } from './word-sorter-game-results.component';

describe('WordSorterGameResultsComponent', () => {
  let component: WordSorterGameResultsComponent;
  let fixture: ComponentFixture<WordSorterGameResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSorterGameResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSorterGameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
