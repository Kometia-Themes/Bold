var glob = require("glob");
var fs = require("fs");
var replace = require("replace");

// Find file
glob("./dist/assets/styles.css.twig",function (err,files) {
  if (err) throw err;
  files.forEach(
    function (item,index,array){
      replace({
        regex: "\"{{",
        replacement: "{{",
        paths: [item],
        recursive: true,
        silent: true,
      });
      replace({
        regex: "}}\"",
        replacement: "}}",
        paths: [item],
        recursive: true,
        silent: true,
      });
    }
  );
});