import urlcat, { ParamMap } from 'urlcat';

export interface FetchNoMagicConstructorParams {
  readonly baseUrl: string;
}

class FetchNoMagicClient {
  readonly baseUrl: string;

  constructor({ baseUrl }: FetchNoMagicConstructorParams) {
    this.baseUrl = baseUrl;
  }
}

const parsePathTemplateFromObjectPropName = (propName: string) =>
  propName
    .replace(new RegExp(`^${httpMethodPrefixList.join('|')}`), '')
    .replace(/_(?=([a-z]))/g, ':')
    .split(new RegExp(`(?=(?<!:.+)[A-Z]|:|_)`))
    .map(word =>
      word.indexOf(':') > -1 ? word : word.replace('_', '').toLowerCase()
    )
    .join('/');

type SupportHttpMethods = 'get' | 'post' | 'put' | 'delete';

const httpMethodPrefixList: readonly SupportHttpMethods[] = [
  'get',
  'post',
  'put',
  'delete',
];

export type FetchMagicMethodParams = ParamMap;
export type FetchMagicMethodOptions = Omit<RequestInit, 'method'>;
export type FetchMagicMethod = (
  params?: FetchMagicMethodParams,
  options?: FetchMagicMethodOptions
) => Promise<Response>;

const proxyHandler: ProxyHandler<FetchMagicClientProps> = {
  get(target, prop): FetchMagicMethod {
    return (
      params: FetchMagicMethodParams = {},
      options?: FetchMagicMethodOptions
    ) =>
      new Promise((resolve, reject) => {
        if (typeof prop === 'symbol') {
          throw new Error('Symbol is not supported.');
        }
        const httpMethodType = httpMethodPrefixList.find(
          prefix => prop.indexOf(prefix) === 0
        );
        if (!httpMethodType) {
          throw new Error(
            `Please prefix the prop name with ${httpMethodPrefixList.join(
              ', '
            )}.`
          );
        }
        const pathTemplate = parsePathTemplateFromObjectPropName(prop);
        fetch(urlcat(target.baseUrl, pathTemplate, params), {
          ...options,
          method: httpMethodType.toUpperCase(),
        })
          .then(resolve)
          .catch(reject);
      });
  },
};

export type CreateFetchMagicParams = FetchNoMagicConstructorParams;

type FetchMagicProxyKey = `${SupportHttpMethods}${string}`;
type FetchMagicClientProps = {
  [key in FetchMagicProxyKey]: FetchMagicMethod;
} & FetchNoMagicConstructorParams;

const fetchMagic = (params: CreateFetchMagicParams) =>
  new Proxy(
    new FetchNoMagicClient(params) as unknown as FetchMagicClientProps,
    proxyHandler
  );

export default fetchMagic;
