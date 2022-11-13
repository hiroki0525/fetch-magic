import urlcat, { ParamMap } from 'urlcat';
import fetch from 'cross-fetch';

export type SupportDecodeType = keyof Pick<
  Body,
  'json' | 'text' | 'arrayBuffer'
>;

export interface FetchNoMagicConstructorParams {
  readonly baseUrl: string;
  readonly defaultDecodeType?: SupportDecodeType;
}

class FetchNoMagicClient {
  readonly baseUrl: string;
  readonly defaultDecodeType?: SupportDecodeType;

  constructor({ baseUrl, defaultDecodeType }: FetchNoMagicConstructorParams) {
    this.baseUrl = baseUrl;
    this.defaultDecodeType = defaultDecodeType;
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
export type FetchMagicMethodOptions = Omit<RequestInit, 'method'> & {
  readonly decodeType?: SupportDecodeType;
};
export type FetchMagicMethod = (
  params?: FetchMagicMethodParams,
  options?: FetchMagicMethodOptions
) => Promise<Response | ArrayBuffer | any | string>;

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
        const decodeType = options?.decodeType || target.defaultDecodeType;
        fetch(urlcat(target.baseUrl, pathTemplate, params), {
          ...options,
          method: httpMethodType.toUpperCase(),
        })
          .then(async res => {
            if (decodeType) {
              resolve(await res[decodeType]());
            } else {
              resolve(res);
            }
          })
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
