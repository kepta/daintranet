import { requestName, setName } from '../network/profile';

export const SET_PROFILE_ID = 'SET_PROFILE_ID';
export const GETTING_PROFILE_NAME = 'GETTING_NAME';
export const GOT_PROFILE_NAME = 'GOT_PROFILE_NAME';
export const GOT_ERROR = 'GOT_ERROR';
export const SETTING_PROFILE_NAME = 'SETTING_PTOFILE_NAME';

export function settingProfileName() {
  // console.log('settingProfileName');
  return {
    type: SETTING_PROFILE_NAME,
    settingName: true,
  };
}

export function setProfileId(id) {
  return {
    type: SET_PROFILE_ID,
    id,
  };
}

export function gettingProfileName() {
  // console.log('gettingProfileName');
  return {
    type: GETTING_PROFILE_NAME,
    gettingName: true,
  };
}

export function gotProfileName(name) {
  return {
    type: GOT_PROFILE_NAME,
    name,
  };
}

export function gotError(error) {
  return {
    type: GOT_ERROR,
    error,
  };
}

export function getProfileName(id, uid) {
  return dispatch => {
    dispatch(gettingProfileName);
    return requestName(id, uid)
      .then((name) => (dispatch(gotProfileName(name))))
      .catch((error) => dispatch(gotError(error)));
  };
}

export function setProfileName(id, name, uid) {
  return dispatch => {
    dispatch(settingProfileName);
    return setName(id, name, uid)
      .then(() => dispatch(getProfileName(id, uid)))
      .catch((error) => dispatch(gotError(error)));
  };
}
