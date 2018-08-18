import { queryParams } from './nextjs/urlParams';

export default (router, pathname, params = {}) => {
  const query = { ...queryParams(router, ['theme', 'packages']) };
  router.push({ pathname, query: { ...query || {}, ...params } });
};
