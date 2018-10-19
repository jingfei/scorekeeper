import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextIconService {
  xmlns = "http://www.w3.org/2000/svg";

  constructor() { }

  getHitKindIcon(id: string): Element {
    switch(id) {
      case 'g': return this.getGroundIcon();
      case 'h': return this.getLineIcon();
      case 'f': return this.getFlyIcon();
    }
  }

  getPitchIcon(id: string): Element {
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

  getSvgElm(...symbs): Element {
    var svgElm = document.createElementNS(this.xmlns, "svg");
    svgElm.classList.add("symb");
    svgElm.setAttributeNS(null, "height", "12");
    svgElm.setAttributeNS(null, "width", "12");

    symbs.forEach(symb => {
      symb.setAttributeNS(null, "stroke-width", "1");
      svgElm.appendChild(symb);
    });

    return svgElm;
  }

  getBallIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 0 6 L 12 6");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }

  getStrikeIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "circle");
    symb.setAttributeNS(null, "r", "4");
    symb.setAttributeNS(null, "cx", "6");
    symb.setAttributeNS(null, "cy", "6");
    symb.setAttributeNS(null, "fill", "transparent");
    return this.getSvgElm(symb);
  }

  getSwingMissIcon(): Element {
    var symb1 = document.createElementNS(this.xmlns, "circle");
    symb1.setAttributeNS(null, "r", "4");
    symb1.setAttributeNS(null, "cx", "6");
    symb1.setAttributeNS(null, "cy", "6");
    symb1.setAttributeNS(null, "fill", "transparent");

    var symb2 = document.createElementNS(this.xmlns, "path");
    symb2.setAttributeNS(null, "d", "M 0 6 L 12 6");
    symb2.setAttributeNS(null, "fill", "none");

    return this.getSvgElm(symb1, symb2);
  }

  getFoulIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 0 12 L 6 0 L 12 12 Z");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }

  getInPlayIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "circle");
    symb.setAttributeNS(null, "r", "2");
    symb.setAttributeNS(null, "cx", "6");
    symb.setAttributeNS(null, "cy", "6");
    symb.setAttributeNS(null, "fill", "black");
    return this.getSvgElm(symb);
  }

  getHitByPitchIcon(): Element {
    var spanElm = document.createElement('span');
    spanElm.innerText = 'D';
    return spanElm;
  }

  getGroundIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 0 16 A 18 18 0 0 0 20 16");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }

  getLineIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 0 4 L 20 4");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }

  getFlyIcon(): Element {
    var symb = document.createElementNS(this.xmlns, "path");
    symb.setAttributeNS(null, "d", "M 20 8 A 18 18 0 0 0 0 8");
    symb.setAttributeNS(null, "fill", "none");
    return this.getSvgElm(symb);
  }
}
