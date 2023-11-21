const mjml2html = require("mjml");
const fs = require("fs");

const directory = "01-basics";

const mjmlContent = fs.readFileSync(`./${directory}/index.mjml`, "utf-8");

const convertedObject = mjml2html(mjmlContent);

fs.writeFileSync(`./${directory}/index.html`, convertedObject.html, "utf-8");
