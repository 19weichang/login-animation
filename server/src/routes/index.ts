const user = require('./user');

const routesRequire = [
  user,
];

module.exports = {
  install(app:any) {
    routesRequire.forEach(route => route.install(app));
  }
};