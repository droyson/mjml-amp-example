const mjml2html = require("mjml");
const fs = require("fs");
const mjmlJson = require("./index.json");

const convertedObject = mjml2html(mjmlJson);

fs.writeFileSync(`${__dirname}/index.html`, convertedObject.html, "utf-8");
