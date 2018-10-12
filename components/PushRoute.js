import URLSearchParams from 'url-search-params';
import { Router } from '../server/routes';
import { queryParams } from './nextjs/urlParams';

export default (item) => {
  const query = { ...queryParams(Router, ['theme', 'packages']) };
  const params = new URLSearchParams({ ...query, ...item.params });
  Router.pushRoute(`${item.route}?${params.toString()}`);
};
