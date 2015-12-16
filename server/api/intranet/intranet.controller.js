var dir = require('node-dir');
const _dirname = '/Users/kushanjoshi/code';
const intranet = {};

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

export function index(req, res) {
  dir.paths(_dirname, function (err, paths) {
    if (err)
      handleError(res)(err);
    paths.dirs.forEach((path) => {
      var temp = intranet;
      path.split('/').forEach((dir) => {
        temp[dir] = temp[dir]
          ? temp[dir]
          : {};
        temp = temp[dir];
      });
    });
    paths.files.forEach((path) => {
      var temp = intranet;
      path.split('/').forEach((dir) => {
        temp[dir] = temp[dir]
          ? temp[dir]
          : 'file';
        temp = temp[dir];
      });
    });
    return responseWithResult(res)(intranet);
  });
}
