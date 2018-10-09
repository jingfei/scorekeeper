(function() {
	field.init();
  textRecord();
})();

window.onresize = function(event) { field.adjustWidth(); };

Object.defineProperties(Array.prototype, {
  count: {
    value: function(query) {
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

