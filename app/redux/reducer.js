import { combineReducers } from 'redux';
import Immutable from 'immutable';
import arrayFrom from 'array-from';
const INBOX_LIMIT = 20;

import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGGING,
  LOGIN_ERROR,
  SET_CREDENTIALS,
  SESSION_RESUME,
} from './loginActions';

import {
  REQUEST_INTRANET_TREE,
  RECEIVE_INTRANET_TREE,
  RECEIVE_INTRANET_ERROR,
  GO_FORWARD,
  GO_TO_PATH,
  ADD_FAV,
  QUICK_SEARCH_INTRANET,
  LONG_SEARCH,
  SEARCH_ERROR,
} from './intranetActions';

// import {
//   RECEIVE_INBOX,
//   REQUEST_INBOX,
//   RECEIVE_INBOX_ERROR,
//   REQUEST_EMAIL,
//   RECEIVE_EMAIL,
//   RECEIVE_EMAIL_ERROR,
//   QUICK_SEARCH_WEBMAIL,
//   NULL_THE_EMAIL,
// } from './webmailActions';


// import {
//   SET_PROFILE_ID,
//   GETTING_PROFILE_NAME,
//   GOT_PROFILE_NAME,
//   GOT_ERROR,
//   SETTING_PROFILE_NAME,
//  } from './profileActions';

const initialLoginState = {
  STATUS: LOGGED_OUT,
  ERROR: '',
  ID: null,
  PASS: null,
  AUTHID: null,
};

const getId = (state) => {
  return state.todos.reduce((maxId, todoItem) => {
    return Math.max(todoItem.ID, maxId);
  }, -1) + 1;
};

const todoState = {
  todos: [],
  gettingTodos: true,
};

const chatState = {
  chats: [{
    id: 'First',
    message: 'message',
    time: '01',
  },
  ],
};


export function login(state = initialLoginState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return Object.assign({}, state, {
        STATUS: action.type,
        AUTHID: action.authid,
      });
    case LOGGED_OUT:
      return Object.assign({}, state, {
        STATUS: action.type,
        ID: null,
        PASS: null,
      });
    case LOGGING:
      return Object.assign({}, state, {
        STATUS: action.type,
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        STATUS: action.type,
        ERROR: action.error,
      });
    case SET_CREDENTIALS:
      return Object.assign({}, state, {
        STATUS: LOGGED_OUT,
        ID: action.id,
        PASS: action.pass,
      });
    case SESSION_RESUME:
      return Object.assign({}, state, {
        STATUS: LOGGED_IN,
        ID: action.password.email,
        PASS: action.pass,
        AUTHID: action.uid,
      });
    default:
      return state;
  }
}

const initialIntranetState = {
  isFetching: false,
  path: [],
  pathString: [],
  tree: null,
  error: null,
  location: null,
  timeStamp: null,
  fav: Immutable.fromJS([{
    isFile: false,
    name: 'Intranet',
    path: [],
  }]),
};

export function traverseIntranet(tree, path) {
  return path.reduce((prev, cur) => {
    return prev.get(cur);
  }, tree);
}

export function processLocation(loc, path) {
  return Immutable.fromJS(arrayFrom(loc.keys()).sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).map(key => {
    return {
      isFile: loc.get(key) === 'file',
      name: key,
      path: path.concat(key),
    };
  }));
}

function checkFav(favList, newFav) {
  let array = favList.toArray();
  array = array.filter((e) => {
    return e.get('name') !== newFav.get('name');
  });
  if (array.length === favList.count()) {
    return favList.push(newFav);
  }
  return Immutable.fromJS(array);
}

export function intranet(state=initialIntranetState, action) {
  let newSearchObj;
  let tree;
  let location;
  let pathString;

  switch (action.type) {
    case REQUEST_INTRANET_TREE:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        location: null,
      });

    case RECEIVE_INTRANET_TREE:
      tree = Immutable.fromJS(action.tree);
      location = traverseIntranet(tree, state.pathString);
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        tree,
        timeStamp: action.timeStamp,
        lastFetched: Date.now(),
        location: processLocation(location, state.pathString),
      });

    case RECEIVE_INTRANET_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        location: [],
        tree: null,
      });

    case GO_FORWARD:
      pathString = state.pathString.concat(action.location);
      return Object.assign({}, state, {
        pathString,
        location: traverseIntranet(state.tree, pathString),
      });
    case GO_TO_PATH:
      pathString = action.toPath || [];
      return Object.assign({}, state, {
        pathString,
        search: null,
        quickSearch: null,
        isSearching: false,
        location: processLocation(traverseIntranet(state.tree, pathString), pathString),
      });
    case ADD_FAV:
      return Object.assign({}, state, {
        fav: checkFav(state.fav, action.fav),
      });
    case QUICK_SEARCH_INTRANET:
      newSearchObj = new Immutable.List();
      processLocation(state.tree.get('Lecture'), ['Lecture']).forEach(v => {
        if (v.get('name').toLowerCase().indexOf(action.searchToken.toLowerCase()) > -1) {
          newSearchObj = newSearchObj.push(v);
        }
      });
      state.location.forEach(v => {
        if (v.get('name').toLowerCase().indexOf(action.searchToken.toLowerCase()) > -1) {
          newSearchObj = newSearchObj.push(v);
        }
      });
      return Object.assign({}, state, {
        quickSearch: newSearchObj,
        isSearching: true,
        searchError: null,
      });
    case LONG_SEARCH:
      return Object.assign({}, state, {
        search: state.isSearching ? action.searchResults : null,
        isSearching: false,
        searchError: null,
      });
    case SEARCH_ERROR:
      return Object.assign({}, state, {
        isSearching: false,
        search: null,
        quickSearch: null,
        searchError: action.error,
      });
    default:
      return state;
  }
}

const webmailState = {
  isFetching: false,
  isFetchingEmail: false,
  inbox: null,
  emailId: null,
  email: null,
  lastFetched: -Infinity,
  error: null,
};

// export function webmail(state=webmailState, action) {
//   let newSearchObj;
//   switch (action.type) {
//     case REQUEST_INBOX:
//       return Object.assign({}, state, {
//         isFetching: true,
//         quickSearch: null,
//         email: null,
//       });
//     case RECEIVE_INBOX:
//       return Object.assign({}, state, {
//         inbox: Immutable.fromJS(action.inbox.slice(0, INBOX_LIMIT)),
//         lastFetched: Date.now(),
//         isFetching: false,
//         quickSearch: null,
//         email: null,
//       });
//     case RECEIVE_INBOX_ERROR:
//       return Object.assign({}, state, {
//         error: action.error,
//         isFetching: false,
//         quickSearch: null,
//       });
//     case REQUEST_EMAIL:
//       return Object.assign({}, state, {
//         isFetchingEmail: true,
//         emaildId: action.emailId,
//         quickSearch: null,
//         email: null,
//       });
//     case RECEIVE_EMAIL:
//       return Object.assign({}, state, {
//         isFetchingEmail: false,
//         email: action.email,
//         quickSearch: null,
//       });
//     case RECEIVE_EMAIL_ERROR:
//       return Object.assign({}, state, {
//         isFetchingEmail: false,
//         error: action.error,
//         quickSearch: null,
//         email: null,
//       });
//     case NULL_THE_EMAIL:
//       return Object.assign({}, state, {
//         isFetchingEmail: false,
//         email: null,
//         quickSearch: null,
//       });
//     case QUICK_SEARCH_WEBMAIL:
//       newSearchObj = new Immutable.List();
//       state.inbox.forEach(v => {
//         if ((v.get('su').toLowerCase().indexOf(action.searchToken.toLowerCase()) > -1)
//         || (v.get('fr').toLowerCase().indexOf(action.searchToken.toLowerCase()) > -1)) {
//           newSearchObj = newSearchObj.push(v);
//         } else {
//           v.get('e').forEach(w => {
//             if (w.get('p')!==undefined && w.get('p').toLowerCase().indexOf(action.searchToken.toLowerCase()) > -1) {
//               newSearchObj = newSearchObj.push(v);
//             }
//           });
//         }
//       });
//
//       return Object.assign({}, state, {
//         quickSearch: newSearchObj,
//         email: null,
//       });
//     default:
//       return state;
//   }
// }


// const initialProfileState = {
//   id: null,
//   name: null,
//   gettingName: false,
//   settingName: false,
//   error: null,
// };
//
// export function profile(state= initialProfileState, action) {
//   switch (action.type) {
//     case SET_PROFILE_ID:
//       return Object.assign({}, state, {
//         id: action.id,
//       });
//     case GETTING_PROFILE_NAME:
//       return Object.assign({}, state, {
//         gettingName: true,
//         settingName: false,
//       });
//     case GOT_PROFILE_NAME:
//       return Object.assign({}, state, {
//         name: action.name,
//         gettingName: false,
//       });
//     case GOT_ERROR:
//       return Object.assign({}, state, {
//         error: action.error,
//       });
//     case SETTING_PROFILE_NAME:
//       return Object.assign({}, state, {
//         settingName: true,
//         gettingName: false,
//       });
//     default:
//       return state;
//   }
// }

export default combineReducers({ login, intranet });
