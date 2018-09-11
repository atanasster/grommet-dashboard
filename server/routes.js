const routes = require('next-routes')();

const SITE_ROOT = '';
module.exports.SITE_ROOT = SITE_ROOT;

routes.add({ name: 'package', pattern: '/package/:name', page: `${SITE_ROOT}/package` });
routes.add({ name: 'githuborg', pattern: '/organization/:name', page: `${SITE_ROOT}/githuborg` });

module.exports = routes;
