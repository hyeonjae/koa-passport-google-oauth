const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:3002/', changeOrigin: true }));
  app.use(proxy('/auth', { target: 'http://localhost:3002/', changeOrigin: true }));
};
