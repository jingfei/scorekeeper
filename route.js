var path = require('path');
var url = require('url');

route = [
  {
    data: {
      "url": "",
      "title": "scorekeeper",
      "menu_home": true,
      "baseUrl": "./",
	  "lang": "zh-TW"
    },
    "partials": './partials.js',
    "layout":  "./view/home.hbs",
    "filename": "./docs/index.html"
  }
];

module.exports = route;
