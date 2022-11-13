import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

jest.setMock('cross-fetch', fetchMock);

import fetchMagic, { FetchMagicMethodOptions } from './index';

enableFetchMocks();

describe('fetchMagic', () => {
  const baseUrl = 'https://jest-test.com/api';
  const client: ReturnType<typeof fetchMagic> = fetchMagic({ baseUrl });

  describe('no error', () => {
    beforeEach(() => {
      (fetch as any).mockResponseOnce(Promise.resolve());
    });

    afterEach(() => {
      (fetch as any).resetMocks();
    });

    describe('http method is', () => {
      describe('GET', () => {
        beforeAll(async () => {
          await client.get();
        });

        it('call GET method', () => {
          expect(fetch).toHaveBeenCalledWith(baseUrl, {
            method: 'GET',
          });
        });
      });

      describe('POST', () => {
        beforeAll(async () => {
          await client.post();
        });

        it('call POST method', () => {
          expect(fetch).toHaveBeenCalledWith(baseUrl, {
            method: 'POST',
          });
        });
      });

      describe('PUT', () => {
        beforeAll(async () => {
          await client.put();
        });

        it('call PUT method', () => {
          expect(fetch).toHaveBeenCalledWith(baseUrl, {
            method: 'PUT',
          });
        });
      });

      describe('DELETE', () => {
        beforeAll(async () => {
          await client.delete();
        });

        it('call DELETE method', () => {
          expect(fetch).toHaveBeenCalledWith(baseUrl, {
            method: 'DELETE',
          });
        });
      });
    });

    describe('request url has', () => {
      const defaultHttpMethod = {
        method: 'GET',
      };

      describe('no path param', () => {
        describe('and no url suffix', () => {
          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users`;

            beforeAll(async () => {
              await client.getUsers();
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users?page=1`;

            beforeAll(async () => {
              await client.getUsers({ page: 1 });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers({ page: 1, name: 'test' });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });
        describe('and url suffix', () => {
          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/articles`;

            beforeAll(async () => {
              await client.getUsersArticles();
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/articles?page=1`;

            beforeAll(async () => {
              await client.getUsersArticles({ page: 1 });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/articles?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsersArticles({ page: 1, name: 'test' });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });
      });

      describe('one path param', () => {
        const userId = 'USER_ID';

        describe('and no url suffix', () => {
          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}`;

            beforeAll(async () => {
              await client.getUsers_userId({ userId });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}?page=1`;

            beforeAll(async () => {
              await client.getUsers_userId({ userId, page: 1 });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/${userId}?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers_userId({ userId, page: 1, name: 'test' });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });

        describe('and url suffix', () => {
          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles({ userId });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles?page=1`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles({ userId, page: 1 });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles({
                userId,
                page: 1,
                name: 'test',
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });
      });

      describe('some path params', () => {
        const userId = 'USER_ID';
        const articleId = 'ARTICLE_ID';

        describe('and no url suffix', () => {
          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId({
                userId,
                articleId,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}?page=1`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId({
                userId,
                articleId,
                page: 1,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });

          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId({
                userId,
                articleId,
                page: 1,
                name: 'test',
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });

        describe('and static url suffix', () => {
          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_Test({
                userId,
                articleId,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/test?page=1`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_Test({
                userId,
                articleId,
                page: 1,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/test?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_Test({
                userId,
                articleId,
                page: 1,
                name: 'test',
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });

        describe('and path param suffix', () => {
          const testId = 'TEST_ID';

          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/${testId}`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_testId({
                userId,
                articleId,
                testId,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/${testId}?page=1`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_testId({
                userId,
                articleId,
                testId,
                page: 1,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/${testId}?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_testId({
                userId,
                articleId,
                testId,
                page: 1,
                name: 'test',
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });

        describe('and path param suffix with static url suffix', () => {
          const testId = 'TEST_ID';

          describe('and no query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/${testId}/test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_testId_Test({
                userId,
                articleId,
                testId,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and one query param', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/${testId}/test?page=1`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_testId_Test({
                userId,
                articleId,
                testId,
                page: 1,
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
          describe('and some query params', () => {
            const expectedUrl = `${baseUrl}/users/${userId}/articles/${articleId}/${testId}/test?page=1&name=test`;

            beforeAll(async () => {
              await client.getUsers_userId_Articles_articleId_testId_Test({
                userId,
                articleId,
                testId,
                page: 1,
                name: 'test',
              });
            });

            it(expectedUrl, () => {
              expect(fetch).toHaveBeenCalledWith(
                expectedUrl,
                defaultHttpMethod
              );
            });
          });
        });
      });
    });

    describe('fetch is success', () => {
      it('return Response', async () => {
        await expect(client.get()).resolves.toBeInstanceOf(Response);
      });
    });

    describe('with decodeType', () => {
      beforeAll(() => {
        (fetch as any).resetMocks();
      });

      describe('client has decodeType property', () => {
        const clientWithDecodeType: ReturnType<typeof fetchMagic> = fetchMagic({
          baseUrl,
          defaultDecodeType: 'text',
        });

        describe('and no fetch decodeType option', () => {
          beforeAll(() => {
            (fetch as any).mockResponseOnce('text');
          });

          it('return String', async () => {
            await expect(clientWithDecodeType.get()).resolves.toBe('text');
          });
        });

        describe('and fetch decodeType option', () => {
          beforeAll(() => {
            (fetch as any).mockResponseOnce(new ArrayBuffer(20));
          });

          it('return ArrayBuffer', async () => {
            await expect(
              clientWithDecodeType.get({}, { decodeType: 'arrayBuffer' })
            ).resolves.toBeInstanceOf(ArrayBuffer);
          });
        });
      });

      describe('client has no decodeType property', () => {
        describe('and no fetch decodeType option', () => {
          beforeAll(() => {
            (fetch as any).mockResponseOnce('text');
          });

          it('return Response', async () => {
            await expect(client.get()).resolves.toBeInstanceOf(Response);
          });
        });

        describe('and fetch decodeType option', () => {
          beforeAll(() => {
            (fetch as any).mockResponseOnce(new ArrayBuffer(20));
          });

          it('return ArrayBuffer', async () => {
            await expect(
              client.get({}, { decodeType: 'arrayBuffer' })
            ).resolves.toBeInstanceOf(ArrayBuffer);
          });
        });
      });

      describe('decodeType is', () => {
        describe('nothing', () => {
          beforeAll(() => {
            (fetch as any).mockResponseOnce('text');
          });

          it('return Response', async () => {
            await expect(client.get()).resolves.toBeInstanceOf(Response);
          });
        });

        describe('text', () => {
          beforeAll(() => {
            (fetch as any).mockResponseOnce('text');
          });

          it('return string', async () => {
            await expect(client.get({}, { decodeType: 'text' })).resolves.toBe(
              'text'
            );
          });
        });

        describe('json', () => {
          const expected = { json: 'json' };

          beforeAll(() => {
            (fetch as any).mockResponseOnce(JSON.stringify(expected));
          });

          it('return json', async () => {
            await expect(
              client.get({}, { decodeType: 'json' })
            ).resolves.toStrictEqual(expected);
          });
        });

        describe('arrayBuffer', () => {
          const expected = new ArrayBuffer(1);

          beforeAll(() => {
            (fetch as any).mockResponseOnce(expected);
          });

          it('return ArrayBuffer', async () => {
            await expect(
              client.get({}, { decodeType: 'arrayBuffer' })
            ).resolves.toStrictEqual(expected);
          });
        });
      });
    });

    describe('with options', () => {
      const options: FetchMagicMethodOptions = {
        redirect: 'manual',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      beforeAll(async () => {
        await client.get({}, options);
      });

      it('fetch with options', async () => {
        expect(fetch).toHaveBeenCalledWith(baseUrl, {
          ...options,
          method: 'GET',
        });
      });
    });
  });

  describe('error', () => {
    describe('fetch is fail', () => {
      beforeAll(() => {
        (fetch as any).mockRejectOnce(new Error());
      });

      afterAll(() => {
        (fetch as any).resetMocks();
      });

      it('throw Error', async () => {
        await expect(client.get()).rejects.toThrow();
      });
    });

    describe('client prop is symbol', () => {
      it('throw Error', async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(client[Symbol('test')]()).rejects.toThrow('Symbol');
      });
    });

    describe('client prop prefix is not supported http method name', () => {
      it('throw Error', async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await expect(client.hoge()).rejects.toThrow('Please prefix');
      });
    });
  });
});
