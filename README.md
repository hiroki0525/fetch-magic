# fetch-magic

This is magic🥳

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

`fetch-magic` builds request url using [urlcat](https://github.com/balazsbotond/urlcat).

## Contributing

Please see [CONTRIBUTING.md](https://github.com/hiroki0525/fetch-magic/blob/main/CONTRIBUTING.md) .

## License

Released under the MIT license.