var fs = require('fs');
var minutes = 60, the_interval = minutes * 60 * 1000;
const local = false;

const tree = local ? 'tree.json' : '/root/intranet/tree.json';
const intranet = local ? __dirname+'/' : '/root/intranet/';
var intranetTree = {};

try {
  intranetTree = JSON.parse(fs.readFileSync(tree, 'utf8'));
  delete intranetTree['tree.json'];
  delete intranetTree['log.txt'];
  delete intranetTree['time'];
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
    delete intranetTree['tree.json'];
    delete intranetTree['log.txt'];
    delete intranetTree['time'];
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
    if (req.query.loc.indexOf('.pdf' !== -1)) {
      res.setHeader('content-disposition', 'inline');
    }
    res.sendFile(intranet + req.query.loc);
  } else {
    handleError(res)(new Error('file not found'));
  }
}
