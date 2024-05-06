import { TestBed } from '@angular/core/testing';

import { GamesPointsService } from './games-points.service';

describe('GamesPointsService', () => {
  let service: GamesPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
