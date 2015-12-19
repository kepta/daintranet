var Fuse = require('fuse.js');
var fs = require('fs');
const local = false;
const location = local ? __dirname + '/fuzzy.json' : '/root/intranet/fuzzy.json';
var minutes = 60, the_interval = minutes * 60 * 1000;

let obj = JSON.parse(fs.readFileSync(location, 'utf8'));
const searchKey = {
  keys: ["name"]
};
let fuse = new Fuse(obj, searchKey);
setInterval(function() {
  readFileAsync();
}, the_interval);


function readFileAsync() {
  fs.readFile(location, 'utf8', function (err, data) {
    if (err)  {
      return console.log(err);
    }
    obj = JSON.parse(data);
    fuse = new Fuse(obj, searchKey);
    console.log('read fuzzy');
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

export function show(req, res) {
  return responseWithResult(res)(fuse.search(req.params.id).slice(0, 12));
}
