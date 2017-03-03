var glob = require("glob");
var fs = require("fs");
var replace = require("replace");

// Find file
glob("./dist/assets/styles.css.twig",function (err,files) {
  if (err) throw err;
  files.forEach(function (item,index,array){
    console.log(item + " found");
      // Read file
      console.log(fs.readFileSync(item,'utf8'));
      // Replace string
      replace({
        regex: "\"{{",
        replacement: "{{",
        paths: [item],
        recursive: true,
        silent: true,
      });
      console.log("Replacement complete");
          // Read file
      console.log(fs.readFileSync(item,'utf8'));
      });
  files.forEach(function (item,index,array){
    console.log(item + " found");
      // Read file
      console.log(fs.readFileSync(item,'utf8'));
      // Replace string
      replace({
        regex: "}}\"",
        replacement: "}}",
        paths: [item],
        recursive: true,
        silent: true,
      });
      console.log("Replacement complete");
          // Read file
      console.log(fs.readFileSync(item,'utf8'));
      });
});