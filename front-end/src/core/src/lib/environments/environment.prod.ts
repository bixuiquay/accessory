import { Environment } from "./environment.model";

export const environment: Environment = {
  production: true,
  api: {
    polling: 2000,
    retry: 9007199254740991,
    urls: {
      accessoryUrl: 'http://localhost3400/api'
    },
  },
  baseHref: '/',
  lazyLoad: false,
  pagination: {
    pageSizeOptions: [10, 25, 50, 100]
  },
};
