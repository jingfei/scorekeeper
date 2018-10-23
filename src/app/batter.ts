export enum HitKind {
  NULL, Ground, LineDrive, Fly
}

export enum HitResult {
  B1 = '1B',
  B2 = '2B',
  B3 = '3B',
  HR = 'HR',
  BB = 'BB',
  HitByPitch = 'Hit by pitch',
  E = 'Fielder error',
  FC = 'Fielder choice',
  DP = 'Double Play',
  T = 'Tag out',
  K = 'Strike out',
  KK = 'Strike out swing',
  Out = 'Out'
}

export class Batter {
  kind: HitKind;
  result: HitResult;
  isOut: boolean;

  constructor(values: Object = {}) {
    this.isOut = false;
    Object.assign(this, values);
  }
}
