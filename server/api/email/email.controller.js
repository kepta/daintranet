import request from 'request';
import Firebase from 'firebase';
import { FIREBASE_SECRET } from '../../pass.js';
const FIREBASE = 'https://amber-heat-8849.firebaseio.com/';
const firebaseRef = new Firebase(FIREBASE);

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
  const url = 'https://webmail.daiict.ac.in/home/~/inbox.json';
  req.pipe(request(url)).pipe(res);

  // firebaseRef.createUser({
  //   email: req.auth.,
  //   password: "correcthorsebatterystaple"
  // }, function(error, userData) {
  //   if (error) {
  //     switch (error.code) {
  //       case "EMAIL_TAKEN":
  //         console.log("The new user account cannot be created because the email is already in use.");
  //         break;
  //       case "INVALID_EMAIL":
  //         console.log("The specified email is not a valid email.");
  //         break;
  //       default:
  //         console.log("Error creating user:", error);
  //     }
  //   } else {
  //     console.log("Successfully created user account with uid:", userData.uid);
  //   }
  // });
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
  const url = `https://webmail.daiict.ac.in/home/~/?id=${req.params.id}`;
  req.pipe(request(url)).pipe(res);
}
