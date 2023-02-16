const dummyQueryResolver = require('../resolvers/dummyQueryResolver');
const GetDummyService = require('../../services/getDummyService');

describe('[resolvers]: dummyQueryResolver unit tests', () => {
  test('Testing: dummyQueryResolver', async () => {
    const fakeDummy = {
      id: '123',
      name: 'FakeDummy',
      description: 'fakeDescription'
    };
    const mockExecuteService = jest.fn(() => {
      return fakeDummy;
    });

    const fakeApolloParent = {};
    const fakeApolloArgs = { input: {} };
    const fakeApolloContext = { dataSources: { dummyDatasource: {} } };

    jest.spyOn(GetDummyService.prototype, 'executeService');
    GetDummyService.prototype.executeService = mockExecuteService;
    const result = await dummyQueryResolver.Query.dummy(
      fakeApolloParent,
      fakeApolloArgs,
      fakeApolloContext
    );
    expect(result).toMatchInlineSnapshot(`
      Object {
        "description": "fakeDescription",
        "id": "123",
        "name": "FakeDummy",
      }
    `);
    mockExecuteService.mockClear();
  });
});
