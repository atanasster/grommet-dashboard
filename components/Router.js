import { queryParams } from './nextjs/urlParams';

export default (router, pathname) => {
  const query = { ...queryParams(router, ['theme', 'packages']) };
  console.log({ pathname, query });
  router.push({ pathname, query });
};
