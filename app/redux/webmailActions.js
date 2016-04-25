import { fetchInbox, fetchEmail } from '../network/webmail';

export const RECEIVE_INBOX = 'RECEIVE_INBOX';
export const REQUEST_INBOX = 'REQUEST_INBOX';
export const RECEIVE_INBOX_ERROR = 'RECEIVE_INBOX_ERROR';
export const RECEIVE_EMAIL = 'RECEIVE_EMAIL';
export const REQUEST_EMAIL = 'REQUEST_EMAIL';
export const RECEIVE_EMAIL_ERROR = 'RECEIVE_EMAIL_ERROR';
export const QUICK_SEARCH_WEBMAIL = 'QUICK_SEARCH_WEBMAIL';
export const NULL_THE_EMAIL = 'NULL_THE_EMAIL';

export function requestInbox() {
  return {
    type: REQUEST_INBOX,
  };
}

export function receiveInbox(inbox) {
  return {
    type: RECEIVE_INBOX,
    inbox,
  };
}

export function receiveInboxError(e) {
  return {
    type: RECEIVE_INBOX_ERROR,
    error: e,
  };
}

export function requestEmail(emailId) {
  return {
    type: REQUEST_EMAIL,
    emailId,
  };
}

export function receiveEmail(email) {
  return {
    type: RECEIVE_EMAIL,
    email,
  };
}

export function receiveEmailError(e) {
  return {
    type: RECEIVE_EMAIL_ERROR,
    error: e,
  };
}

export function nullTheEmail() {
  return {
    type: NULL_THE_EMAIL,
  };
}

export function quickSearch(s) {
  return {
    type: QUICK_SEARCH_WEBMAIL,
    searchToken: s,
  };
}

export function searchForWebmail(s) {
  return dispatch => {
    dispatch(quickSearch(s));
  };
}

export function getInbox(user) {
  return dispatch => {
    dispatch(requestInbox);
    return fetchInbox(user)
      .then(d => dispatch(receiveInbox(d)))
      .catch(e => dispatch(receiveInboxError(e)));
  };
}

export function getEmail(user, emailId) {
  return dispatch => {
    dispatch(requestEmail(emailId));
    return fetchEmail(user, emailId)
      .then(d => dispatch(receiveEmail(d)))
      .catch(e => dispatch(receiveEmailError(e)));
  };
}
