import {
  setLogging,
  setLogout,
  setLoggedIn,
  setLoginError,
  verifyUser,
  setCredentials,
  sessionResume,
} from './loginActions';

import {
  requestIntranetTree,
  receiveIntranetTree,
  receiveIntranetError,
  getIntranet,
  goForward,
  goToPath,
  addToFav,
  searchForIntranet,
} from './intranetActions';

// import {
//   getInbox,
//   getEmail,
//   searchForWebmail,
//   nullTheEmail,
// } from './webmailActions';


// import { getProfileName, setProfileName, setProfileId } from './profileActions';

export const actions = {

  setLogging,
  setLogout,
  setLoggedIn,
  setLoginError,
  verifyUser,
  setCredentials,
  sessionResume,

  requestIntranetTree,
  receiveIntranetTree,
  receiveIntranetError,
  getIntranet,
  goForward,
  goToPath,
  addToFav,
  searchForIntranet,

  // getInbox,
  // getEmail,
  // searchForWebmail,
  // nullTheEmail,

  // getProfileName,
  // setProfileName,
  // setProfileId,

};
