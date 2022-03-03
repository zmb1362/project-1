const champs = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getChamps = (request, response) => {
  const responseJSON = {
    champs,
  };

  console.log(responseJSON);

  respondJSON(request, response, 200, responseJSON);
};

const getChampsMeta = (request, response) => {
  return respondJSONMeta(request, response, 200);
};

const addChamp = (request, response, body) => {
  const responseJSON = {
    message: 'Missing Key',
  }

  console.log(body);

  if (!body.id)
  {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 204

  if (!champs[body.id]) {
    responseCode = 201;
    champs[body.id] = {};
  }

  champs[body.id].id = body.id;
  champs[body.id].champs = body.champs;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => {
  return respondJSONMeta(request, response, 404);
};

module.exports = {
  getChamps,
  getChampsMeta,
  addChamp,
  notReal,
  notRealMeta,
};
