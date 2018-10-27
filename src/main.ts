import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

declare global {
  interface Array<T> {
    count(query: T): number,
    last(): T,
    equals(ar: T[]): boolean
  }
}

Object.defineProperties(Array.prototype, {
  count: {
    value: function(query): number {
      var count = 0;
      for(var i=0; i<this.length; i++)
        if(typeof this[i] == 'object') count += this[i].count(query);
        else if (this[i]==query) ++count;
      return count;
    }
  },
  last: {
	  value: function() { return this[this.length - 1]; }
  },
  equals: {
    value: function(ar): boolean {
      if (!ar || ar.length !== this.length) {
        return false;
      }
      for (var i=0; i<this.length; ++i) {
        if (this[i] instanceof Array && ar[i] instanceof Array) {
          if (!this[i].equals(ar[i])) {
            return false;
          }
        } else if (this[i] !== ar[i]) {
          return false;
        }
      }
      return true;
    }
  }
});

