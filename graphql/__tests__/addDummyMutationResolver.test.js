const addDummyMutationResolver = require('../resolvers/addDummyMutationResolver');
const AddDummyService = require('../../services/addDummyService');

describe('[resolvers]: addDummyMutationResolver unit tests', () => {
  test('Testing: addDummyMutationResolver', async () => {
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

    jest.spyOn(AddDummyService.prototype, 'executeService');
    AddDummyService.prototype.executeService = mockExecuteService;
    const result = await addDummyMutationResolver.Mutation.addDummy(
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
