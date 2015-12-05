export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING = 'LOGGING';
export const LOGGED_OUT = 'LOGGED_OUT';

export function setLogging() {
    return {
        type: LOGGING,
    };
}

export function setLogout() {
    return {
        type: LOGGED_OUT,
    };
}
export function setLoggedIn() {
    return {
        type: LOGGED_IN,
    };
}

export const Actions = { setLoggedIn, setLogout, setLogging };
