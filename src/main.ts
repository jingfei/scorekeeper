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
    last(): T
  }
}

Object.defineProperties(Array.prototype, {
  count: {
    value: function(query: string): number {
      let count = 0;
      for(let i=0; i<this.length; i++)
        if(typeof this[i] == 'object') count += this[i].count(query);
        else if (this[i]==query) ++count;
      return count;
    }
  },
  last: {
	  value: function() { return this[this.length - 1]; }
  }
});

