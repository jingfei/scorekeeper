import { Injectable } from '@angular/core';
import { HitKind } from './batter';
import { Pitch } from './action';

@Injectable({
  providedIn: 'root'
})
export class TextIconService {
  xmlns = 'http://www.w3.org/2000/svg';
  hitKindPath = { };

  constructor() {
    this.hitKindPath[HitKind.Ground] = 'M 0 16 A 18 18 0 0 0 20 16';
    this.hitKindPath[HitKind.LineDrive] = 'M 0 4 L 20 4';
    this.hitKindPath[HitKind.Fly] = 'M 20 8 A 18 18 0 0 0 0 8';
  }

  getPitchIconHtml(id: Pitch): string {
    return this.getPitchIcon(id).outerHTML;
  }

  getHitKindPath(id: HitKind): string {
    return this.hitKindPath[id];
  }

  getPitchIcon(id: Pitch): Element {
    switch (id) {
      case Pitch.Strike:
        return this.getStrikeIcon();
      case Pitch.Ball:
        return this.getBallIcon();
      case Pitch.SwingMiss:
        return this.getSwingMissIcon();
      case Pitch.Foul:
        return this.getFoulIcon();
      case Pitch.InPlay:
        return this.getInPlayIcon();
      case Pitch.HitByPitch:
        return this.getHitByPitchIcon();
    }
    return this.getBallIcon();
  }

  getSvgElm(...symbs): Element {
    const svgElm = document.createElementNS(this.xmlns, 'svg');
    svgElm.classList.add('symb');
    svgElm.setAttributeNS(null, 'height', '12');
    svgElm.setAttributeNS(null, 'width', '12');

    symbs.forEach(symb => {
      symb.setAttributeNS(null, 'stroke-width', '1');
      svgElm.appendChild(symb);
    });

    return svgElm;
  }

  getBallIcon(): Element {
    const symb = document.createElementNS(this.xmlns, 'path');
    symb.setAttributeNS(null, 'd', 'M 0 6 L 12 6');
    symb.setAttributeNS(null, 'fill', 'none');
    return this.getSvgElm(symb);
  }

  getStrikeIcon(): Element {
    const symb = document.createElementNS(this.xmlns, 'circle');
    symb.setAttributeNS(null, 'r', '4');
    symb.setAttributeNS(null, 'cx', '6');
    symb.setAttributeNS(null, 'cy', '6');
    symb.setAttributeNS(null, 'fill', 'transparent');
    return this.getSvgElm(symb);
  }

  getSwingMissIcon(): Element {
    const symb1 = document.createElementNS(this.xmlns, 'circle');
    symb1.setAttributeNS(null, 'r', '4');
    symb1.setAttributeNS(null, 'cx', '6');
    symb1.setAttributeNS(null, 'cy', '6');
    symb1.setAttributeNS(null, 'fill', 'transparent');

    const symb2 = document.createElementNS(this.xmlns, 'path');
    symb2.setAttributeNS(null, 'd', 'M 0 6 L 12 6');
    symb2.setAttributeNS(null, 'fill', 'none');

    return this.getSvgElm(symb1, symb2);
  }

  getFoulIcon(): Element {
    const symb = document.createElementNS(this.xmlns, 'path');
    symb.setAttributeNS(null, 'd', 'M 0 12 L 6 0 L 12 12 Z');
    symb.setAttributeNS(null, 'fill', 'none');
    return this.getSvgElm(symb);
  }

  getInPlayIcon(): Element {
    const symb = document.createElementNS(this.xmlns, 'circle');
    symb.setAttributeNS(null, 'r', '2');
    symb.setAttributeNS(null, 'cx', '6');
    symb.setAttributeNS(null, 'cy', '6');
    symb.setAttributeNS(null, 'fill', 'black');
    return this.getSvgElm(symb);
  }

  getHitByPitchIcon(): Element {
    const spanElm = document.createElement('span');
    spanElm.innerText = 'D';
    return spanElm;
  }

  getHitKindIcon(id: HitKind): Element {
    const symb = document.createElementNS(this.xmlns, 'path');
    // FIXME: hitKindPath does not match html
    symb.setAttributeNS(null, 'd', this.hitKindPath[id]);
    symb.setAttributeNS(null, 'fill', 'none');
    return this.getSvgElm(symb);
  }
}
