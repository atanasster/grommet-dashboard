import nr from 'next-routes';

const routes = nr();
const SITE_ROOT = '';

routes.add({ name: 'package', pattern: '/package/:name/:version?', page: `${SITE_ROOT}/package` });
routes.add({ name: 'inbox', pattern: '/inbox/:kind', page: `${SITE_ROOT}/inbox` });
routes.add({ name: 'documentation', pattern: '/documentation/:library?/:component', page: '/documentation' });
routes.add({ name: 'examples', pattern: '/examples/:library?/:group/:example', page: '/examples' });
export default routes;
const { Link, Router } = routes;
export { Link, Router, SITE_ROOT };
