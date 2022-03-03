const fs = require('fs'); // Pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const css = fs.readFileSync(`${__dirname}/../styles/styles.css`);
const mainJS = fs.readFileSync(`${__dirname}/../src/main.js`);
const appJS = fs.readFileSync(`${__dirname}/../src/app.js`);
const infoJS = fs.readFileSync(`${__dirname}/../src/match-info.js`);

// A simple helper function for serving up static files
const serveFile = (response, file, contentType) => {
  response.writeHead(200, { 'Content-Type': contentType });
  response.write(file);
  response.end();
};

// Serve the client.html page
const getIndex = (request, response) => {
  serveFile(response, index, 'text/html');
};

// Serve the style.css page
const getCSS = (request, response) => {
  serveFile(response, css, 'text/css');
};

const getMainJS = (request, response) => {
  serveFile(response, mainJS, 'text/javascript');
};

const getAppJS = (request, response) => {
  serveFile(response, appJS, 'text/javascript');
};

const getInfoJS = (request, response) => {
  serveFile(response, infoJS, 'text/javascript');
};

module.exports = {
  getIndex,
  getCSS,
  getMainJS,
  getAppJS,
  getInfoJS,
};
