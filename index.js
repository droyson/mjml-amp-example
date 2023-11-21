const mjml2html = require("mjml");
const fs = require("fs");

const directory = "02-head";

const isAmp = true;

const fileName = isAmp ? "amp" : "html";

const mjmlContent = fs.readFileSync(`./${directory}/index.mjml`, "utf-8");

const convertedObject = mjml2html(mjmlContent, {
    skeleton: isAmp ? "./amp-skeleton" : undefined,
});

fs.writeFileSync(
  `./${directory}/${fileName}.html`,
  convertedObject.html,
  "utf-8"
);
