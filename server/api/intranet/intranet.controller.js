var fs = require('fs');
var minutes = 1, the_interval = minutes * 60 * 1000;
const local = false;

const tree = local ? 'tree.json' : '/root/intranet/tree.json';
const intranet = local ? '': '/root/intranet/';
var intranetTree = {};

try {
  intranetTree = JSON.parse(fs.readFileSync(tree, 'utf8'));
} catch (e) {
  if (e) {
    console.log(e);
    intranetTree = {};
  }
}



setInterval(function() {
  readFileAsync();
}, the_interval);

function readFileAsync() {
  fs.readFile(tree, 'utf8', function (err, data) {
    if (err)  {
      return console.log(err);
    }
    intranetTree = JSON.parse(data);
    console.log('read file');
  });
}


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log(err, err.stack);
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}
//
export function index(req, res) {
  return responseWithResult(res)(intranetTree);
}

export function show(req, res) {
  if (req.query.loc) {
    const path = __dirname;
    res.sendFile(intranet + req.query.loc);
  } else {
    handleError(res)(new Error('file now found'));
  }
}
