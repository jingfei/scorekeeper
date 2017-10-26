var path = require('path');
var url = require('url');

route = [
  {
    data: {
      "url": "",
      "title": "scorekeeper",
      "menu_home": true,
      "baseUrl": "../",
      "lang": "en"
    },
    "partials": './partials.js',
    "layout":  "./view/home.hbs",
    "filename": "./docs/en/index.html"
  }
];

module.exports = route;
