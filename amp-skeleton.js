const { reduce, negate, isNil } = require("lodash");
const buildPreview = require("mjml-core/lib/helpers/preview");
const buildMediaQueriesTags = require("mjml-core/lib/helpers/mediaQueries");

const cssAdjust = (css) =>
  css
    .replace(/<style .*?>/g, "")
    .replace(/<\/style>/g, "")
    .replace(/!important/g, "");

function skeleton(options) {
  const {
    backgroundColor = "",
    breakpoint = "480px",
    content = "",
    mediaQueries = {},
    headStyle = [],
    componentsHeadStyle = {},
    headRaw = [],
    preview,
    style,
    forceOWADesktop,
  } = options;

  // const langAttribute = lang ? `lang="${lang}" ` : '';

  return `
    <!doctype html>
    <html amp4email>
     <meta charset="utf-8">
    <head>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <style amp4email-boilerplate>body{visibility:hidden}</style>       
       
        <style amp-custom>
         ${cssAdjust(
           buildMediaQueriesTags(breakpoint, mediaQueries, forceOWADesktop)
         )}
        ${reduce(
          componentsHeadStyle,
          (result, compHeadStyle) => `${result}\n${compHeadStyle(breakpoint)}`,
          ""
        )}
        ${reduce(
          headStyle,
          (result, _headStyle) => `${result}\n${_headStyle(breakpoint)}`,
          ""
        )}
     ${style && style.length > 0 ? style.join("") : ""}
  


    
    body { margin:0;padding:0;}
    table, td { border-collapse:collapse;}
    img { border:0;height:auto;line-height:100%; outline:none; }
    p { display:block;margin:13px 0; }
  



        </style>

        ${headRaw.filter(negate(isNil)).join("\n")}
      </head>
      <body style="word-spacing:normal;${
        backgroundColor ? `background-color:${backgroundColor};` : ""
      }">
        ${buildPreview(preview)}
        ${content}
      </body>
    </html>
  `;
}

module.exports = skeleton;
