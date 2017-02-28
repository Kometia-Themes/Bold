var replace = require("replace");

var json = require('./src/config/data.json');
var newjson  = JSON.stringify(json);
var params = json.presets.Base;

for (var k in params){
  if (typeof params[k] !== 'function' && params[k] != "" ) {
  replace({
    regex: "\"{{ settings."+k,
    replacement: params[k],
    paths: ['./dist/assets/styles.css'],
    recursive: true,
    silent: true,
  });
  }
}
replace({
    regex: " }}\"",
    replacement: "",
    paths: ['./dist/assets/styles.css'],
    recursive: true,
    silent: true,
  });
