const expressJSDocSwagger = require("express-jsdoc-swagger");
const process = require("node:process");

function initDocs(app) {
  const options = {
    info: {
      version: "1.8.0",
      title: "Backend API",
    },
    baseDir: process.cwd(),
    filesPattern: "./src/**/*.js",
  };

  expressJSDocSwagger(app)(options);
}

module.exports = initDocs;
