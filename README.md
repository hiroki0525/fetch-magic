# fetch-magic

![fetch-magic](https://user-images.githubusercontent.com/40714517/207600070-2d1872c5-8cf5-4407-a1e9-80abd54a6701.png)

[![npm version](https://badge.fury.io/js/fetch-magic.svg)](https://badge.fury.io/js/fetch-magic)
[![Test](https://github.com/hiroki0525/fetch-magic/actions/workflows/test.yml/badge.svg)](https://github.com/hiroki0525/fetch-magic/actions/workflows/test.yml)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [fetch-magic](#fetch-magic)
  - [Set up](#set-up)
  - [Usage](#usage)
    - [initialize](#initialize)
      - [baseUrl: string](#baseurl-string)
      - [defaultDecodeType?: SupportDecodeType](#defaultdecodetype-supportdecodetype)
    - [HTTP request methods](#http-request-methods)
    - [no path parameter](#no-path-parameter)
    - [path parameter](#path-parameter)
    - [query parameter](#query-parameter)
    - [fetch options](#fetch-options)
      - [decodeType?: SupportDecodeType](#decodetype-supportdecodetype)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# fetch-magic

This is magic 🧙‍️🧙‍️ .

You don't need to fetch with request url.

```js
// normally
const usersResponse = await fetch('https://yourdomain/api/users');
const articlesResponse = await fetch('https://yourdomain/api/articles');

// fetch-magic
const client = fetchMagic({ baseUrl: 'https://yourdomain/api' });
const usersResponse = await client.getUsers();
const articlesResponse = await client.getArticles();
```

## Set up

```shell
npm i fetch-magic
# or
yarn add fetch-magic
```

You can also use CDN.

```html
<script crossorigin src="https://unpkg.com/fetch-magic/dist/index.umd.js"></script>
```

## Usage

`fetch-magic` generates request url based on property name.

### initialize

```js
import fetchMagic from 'fetch-magic';

const client = fetchMagic({ baseUrl: 'https://yourdomain/api', defaultDecodeType: 'json' });
```

You can use constructor parameters as below.

#### baseUrl: string

Please set your api base url.

#### defaultDecodeType?: SupportDecodeType

If you use `defaultDecodeType`, fetch response automatically is decoded like json.

`SupportDecodeType` is `'json' | 'text' | 'arrayBuffer'` .

### HTTP request methods

Please prefix HTTP request method name.

```js
const client = fetchMagic({ baseUrl: 'https://yourdomain/api' });

// GET
client.getUsers()

// POST
client.postUsers()

// PUT
client.putUsers()

// DELETE
client.deleteUsers()
```

`fetch-magic` supports `get`, `post`, `put`, and `delete` .

You will encounter an error without the method names if you use TypeScript.

```js
// TypeScript Error
client.hoge()
```

### no path parameter

Please use camelCase.

```js
const client = fetchMagic({ baseUrl: 'https://yourdomain/api' });

// request https://yourdomain/api/users
client.getUsers()

// request https://yourdomain/api/articles
client.getArticles()

// request https://yourdomain/api/users/articles
client.getUsersArticles()
```

### path parameter

Please separate property name with `_` and set first argument with path parameter.

```js
const client = fetchMagic({ baseUrl: 'https://yourdomain/api' });

// request https://yourdomain/api/users/:userId
client.getUsers_userId({ userId: '1234' });

// request https://yourdomain/api/users/:userId/articles
client.getUsers_userId_Articles({ userId: '1234' });

// request https://yourdomain/api/users/:userId/articles/:articleId
client.getUsers_userId_Articles_articleId({ userId: '1234', articleId: '5678' });

// request https://yourdomain/api/users/:userId/:testId
client.getUsers_userId_testId({ userId: '1234', testId: 'test' });
```

### query parameter

Please set first argument with query parameter.

```js
const client = fetchMagic({ baseUrl: 'https://yourdomain/api' });

// request https://yourdomain/api/users?page=1
client.getUsers({ page: 1 });

// request https://yourdomain/api/users?page=1&name=hoge
client.getUsers({ page: 1, name: 'hoge' });

// request https://yourdomain/api/users/:userId?hoge=fuga
client.getUsers_userId({ userId: '1234', hoge: 'fuga' });
```

### fetch options

Please set second argument with [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters) except for `method` and you can also set parameters like below. 

#### decodeType?: SupportDecodeType

Please see [defaultDecodeType](#defaultDecodeType-SupportDecodeType) .

```js
const client = fetchMagic({ baseUrl: 'https://yourdomain/api' });

// with fetch options
const json = await client.getUsers({ page: 1 }, {
  decodeType: 'json',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Dependencies

- [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [cross-fetch](https://github.com/lquixada/cross-fetch)
- [urlcat](https://github.com/balazsbotond/urlcat)

## Contributing

Please see [CONTRIBUTING.md](https://github.com/hiroki0525/fetch-magic/blob/main/CONTRIBUTING.md) .

## License

Released under the MIT license.