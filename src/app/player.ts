enum Hand {
  // Batted / Threw
  RL = 'R/L',
  LL = 'L/L',
  SL = 'S/L',
  RR = 'R/R',
  LR = 'L/R',
  SR = 'S/R',
  RS = 'R/S',
  LS = 'L/S',
  SS = 'S/S'
}

export class Player {
  id: number;
  name: string;
  num: number[];
  hand: Hand;
}
