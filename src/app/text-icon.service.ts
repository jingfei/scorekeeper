import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextIconService {
  xmlns = "http://www.w3.org/2000/svg";

  constructor() { }

  getPitchIcon(id: string): Object {
    switch(id) {
      case 's': return this.getStrikeIcon();
      case 'b': return this.getBallIcon();
      case "w": return this.getSwingMissIcon();
      case 'f': return this.getFoulIcon();
      case 'o': return this.getInPlayIcon();
      case 'd': return this.getHitByPitchIcon();
      default: return this.getBallIcon();
    }
  }

  getSvgElm(...elms): Object {
    svgElm = document.createElementNS(this.xmlns, "svg");
    svgElm.classList.add("symb");
    svgElm.setAttributeNS(null, "height", 12);
    svgElm.setAttributeNS(null, "width", 12);

    symbs.forEach(symb => {
      symb.setAttributeNS(null, "stroke", "black");
      symb.setAttributeNS(null, "stroke-width", 1);
      svgElm.appendChild(symb);
    });

    return svgElm;
  }

  getBallIcon(): Object {
    symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 0 6 L 12 6");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }

  getStrikeIcon(): Object {
    symb = document.createElementNS(this.xmlns, "circle");
    symb.setAttributeNS(null, "r", 4);
    symb.setAttributeNS(null, "cx", 6);
    symb.setAttributeNS(null, "cy", 6);
    symb.setAttributeNS(null, "fill", "transparent");
    return this.getSvgElm(symb);
  }

  getSwingMissIcon(): Object {
    symb1 = document.createElementNS(this.xmlns, "circle");
    symb1.setAttributeNS(null, "r", 4);
    symb1.setAttributeNS(null, "cx", 6);
    symb1.setAttributeNS(null, "cy", 6);
    symb1.setAttributeNS(null, "fill", "transparent");

    symb2 = document.createElementNS(this.xmlns, "path");
    symb2.setAttributeNS(null, "d", "M 0 6 L 12 6");
    symb2.setAttributeNS(null, "fill", "none");

    return this.getSvgElm(symb1, symb2);
  }

  getFoulIcon(): Object {
    symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 0 12 L 6 0 L 12 12 Z");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }

  getInPlayIcon(): Object {
    symb = document.createElementNS(this.xmlns, "circle");
    symb.setAttributeNS(null, "r", 2);
    symb.setAttributeNS(null, "cx", 6);
    symb.setAttributeNS(null, "cy", 6);
    symb.setAttributeNS(null, "fill", "black");
    return this.getSvgElm(symb);
  }

  getHitByPitchIcon(): Object {
    spanElm = document.createElement('span');
    spanElm.innerText = 'D';
    return spanElm;
  }

}
