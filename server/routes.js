const routes = require('next-routes')();

const SITE_ROOT = '';
module.exports.SITE_ROOT = SITE_ROOT;

routes.add({ name: 'package', pattern: '/package/:name/:version?', page: `${SITE_ROOT}/package` });
routes.add({ name: 'inbox', pattern: '/inbox/:kind', page: `${SITE_ROOT}/inbox` });

module.exports = routes;
