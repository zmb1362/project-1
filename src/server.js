const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, handler) => {

  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

/*
const urlStruct = {
  'POST': {
    '/addChamp': jsonHandler.addChamp,
  },
  'GET': {
    '/': htmlHandler.getIndex,
    '/styles/styles.css': htmlHandler.getCSS,
    '/src/main.js': htmlHandler.getMainJS,
    '/src/app.js': htmlHandler.getAppJS,
    '/src/match-info.js': htmlHandler.getInfoJS,
    '/getChamps': jsonHandler.getUsers,
    notFound: jsonHandler.notReal,
  },
  'HEAD': {
    '/getChamps': jsonHandler.getChampsMeta,
    notFound: jsonHandler.notRealMeta,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    if (request.method === 'POST')
    {
      parseBody(request, response, urlStruct[request.method][parsedUrl.pathname]);
    }
    urlStruct[request.method][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct[request.method].notFound(request, response, params);
  }
};
*/


const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/styles/styles.css') {
    htmlHandler.getCSS(request, response);
  }
  else if (parsedUrl.pathname === '/src/main.js') {
    htmlHandler.getMainJS(request, response);
  }
  else if (parsedUrl.pathname === '/src/app.js') {
    htmlHandler.getAppJS(request, response);
  }
  else if (parsedUrl.pathname === '/src/match-info.js') {
    htmlHandler.getInfoJS(request, response);
  }
  else if (parsedUrl.pathname === '/getChamps') {
    jsonHandler.getChamps(request, response);
  }
  else {
    htmlHandler.getIndex(request, response);
  }
};

const handlePost = (request, response, parsedUrl) => {
  
  if(parsedUrl.pathname === '/addChamp') {
    parseBody(request, response, jsonHandler.addChamp);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
