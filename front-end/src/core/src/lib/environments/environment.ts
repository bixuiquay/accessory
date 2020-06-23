import { Environment } from "./environment.model";

export const environment: Environment = {
  production: false,
  api: {
    polling: 2000,
    retry: 100,
    urls: {
      accessoryUrl: 'http://localhost:3400/api'
    },
  },
  baseHref: '/',
  lazyLoad: true,
  pagination: {
    pageSizeOptions: [5, 10, 25, 50, 100]
  },
};
