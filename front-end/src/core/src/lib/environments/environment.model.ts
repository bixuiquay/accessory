export interface ApiEnvironment {
  polling: number
  retry: number
  urls: {
    accessoryUrl: string
  }
}

export abstract class Environment {
  production!: boolean
  api: ApiEnvironment
  baseHref!: string
  lazyLoad!: boolean
  pagination: {
    pageSizeOptions: number[];
  };
}
