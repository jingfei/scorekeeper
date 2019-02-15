import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  inning = 0.0; // .0 away, .5 home batting

  teamHome = [
    { "name": "Jakie Bradley Jr.", "batting": "L", "fielding": 8 },
    { "name": "Brock Holt", "batting": "L", "fielding": 9 },
    { "name": "Steve Pearce", "batting": "R", "fielding": 3 },
    { "name": "Rafael Devers", "batting": "L", "fielding": 0 },
    { "name": "Blake Swihart", "batting": "S", "fielding": 2 },
    { "name": "Brandon Phillips", "batting": "R", "fielding": 4 },
    { "name": "Christian Vazquez", "batting": "R", "fielding": 5 },
    { "name": "Sam Travis", "batting": "R", "fielding": 7 },
    { "name": "Tzu-Wei Lin", "batting": "L", "fielding": 6 },
    { "name": "Chieh-Ming Wang", "fielding": 1 }
  ];

  teamAway =  [
    { "name": "a", "batting": "L", "fielding": 1 },
    { "name": "b", "batting": "R", "fielding": 2 },
    { "name": "c", "batting": "R", "fielding": 3 },
    { "name": "d", "batting": "R", "fielding": 4 },
    { "name": "e", "batting": "R", "fielding": 5 },
    { "name": "f", "batting": "R", "fielding": 6 },
    { "name": "g", "batting": "R", "fielding": 7 },
    { "name": "h", "batting": "R", "fielding": 8 },
    { "name": "i", "batting": "R", "fielding": 9 }
  ];

  constructor() { }

  getInning(): number {
    return Math.trunc(this.inning);
  }

  getFieldingTeam(): any[] {
    return this.inning % 1 > 0.5 ? this.teamAway.slice() : this.teamHome.slice();
  }

  getBattingTeam(): any[] {
    return this.inning % 1 > 0.5 ? this.teamHome.slice() : this.teamAway.slice();
  }

  changeFieldingPlayer(position: number, player: any): GameDataService {
    var team = this.inning % 1 > 0.5 ? this.teamAway : this.teamHome;
    team = team.map(p => {
      if (p.fielding === position) {
        p.name = player.name;
        p.batting = player.batting;
      }
      return p;
    });
    return this;
  }
}
