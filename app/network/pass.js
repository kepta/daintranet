export function getPass(token) {
  let jwt = localStorage.getItem('firebase:jwt::amber-heat-8849');
  if (!jwt) {
    return jwt;
  }
  jwt = atob(jwt);
  return jwt.slice(token.length);
}
export function setPass(token, pass) {
  localStorage.setItem('firebase:jwt::amber-heat-8849', btoa(token + pass));
}
