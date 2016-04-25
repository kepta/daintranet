import { fetchIntranet, fuzzySearch } from '../network/intranet';
import ParseDate from '../helper/dateParse';

export const REQUEST_INTRANET_TREE = 'REQUEST_INTRANET_TREE';
export const RECEIVE_INTRANET_TREE = 'RECEIVE_INTRANET_TREE';
export const RECEIVE_INTRANET_ERROR = 'RECEIVE_INTRANET_ERROR';
export const GO_FORWARD = 'GO_FORWARD';
export const GO_TO_PATH = 'GO_TO_PATH';
export const ADD_FAV = 'ADD_FAV';
export const BEGIN_SEARCH = 'BEGIN_SEARCH';
export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const QUICK_SEARCH_INTRANET = 'QUICK_SEARCH_INTRANET';
export const LONG_SEARCH = 'LONG_SEARCH';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function requestIntranetTree() {
  return {
    type: REQUEST_INTRANET_TREE,
  };
}

export function receiveIntranetTree(response) {
  return {
    type: RECEIVE_INTRANET_TREE,
    tree: response.intranet,
    timeStamp: ParseDate.timeSince(response.timeStamp),
  };
}

export function receiveIntranetError(error) {
  return {
    type: RECEIVE_INTRANET_ERROR,
    error,
  };
}

export function goForward(location) {
  return {
    type: GO_FORWARD,
    location,
  };
}

export function goToPath(toPath) {
  return {
    type: GO_TO_PATH,
    toPath,
  };
}

export function addToFav(fav) {
  return {
    type: ADD_FAV,
    fav,
  };
}

export function quickSearch(s) {
  return {
    type: QUICK_SEARCH_INTRANET,
    searchToken: s,
  };
}

export function longSearch(s) {
  return {
    type: LONG_SEARCH,
    searchResults: s,
  };
}

export function searchError(e) {
  return {
    type: SEARCH_ERROR,
    error: e,
  };
}
export function searchForIntranet(s) {
  return dispatch => {
    dispatch(quickSearch(s));
    return fuzzySearch(s)
      .then(d => dispatch(longSearch(d)))
      .catch(e => dispatch(searchError(e)));
  };
}

export function getIntranet() {
  return dispatch => {
    dispatch(requestIntranetTree());
    return fetchIntranet()
      .then((t) => dispatch(receiveIntranetTree(t)))
      .catch((e) => dispatch(receiveIntranetError(e)));
  };
}
