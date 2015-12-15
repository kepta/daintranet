import _ from 'lodash';
import monk from 'monk';
const db = monk('localhost/intranet');
import Request from 'superagent';


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log('err.stack');
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

export function index(req, res) {
  Request.get('https://webmail.daiict.ac.in/home/~/inbox.json')
    .set('Authorization', req.headers.authorization)
    .on('error', handleError(res))
    .end( (err, res2) => {
      if (err) {
        return handleError(res)(err);
      }
      return responseWithResult(res)(JSON.parse(res2.text));
    });
}

function fetchEmail(id, auth, res) {
  Request.get(`https://webmail.daiict.ac.in/home/~/?id=${id}`)
    .set('Authorization', auth)
    .end( (err, res2) => {
      if (err || !res2.text) {
        return handleError(res)(err);
      }
      return res.send(res2.text);
    });
}

export function show(req, res) {
  fetchEmail(req.params.id, req.headers.authorization, res);
}
