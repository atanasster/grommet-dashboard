const routes = require('next-routes')();

const SITE_ROOT = '';
module.exports.SITE_ROOT = SITE_ROOT;

routes.add({ name: 'package', pattern: '/package/:name', page: `${SITE_ROOT}/package` });

module.exports = routes;
