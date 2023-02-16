const DummyDatasource = require('../dummyDatasource');

describe('[internal-datasource]: DummyDatasource unit tests', () => {
  test('Testing: DummyDatasource.createDummy - success', async () => {
    const fakeDummy = { name: 'Fakename', description: 'fakeDescription' };
    const mockCreate = jest.fn(() => {
      return { dataValues: { id: '123', ...fakeDummy } };
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });

    const fakeDatabase = {
      Dummy: {
        create: mockCreate
      }
    };
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    const result = await dummyDatasource.createDummy(fakeDummy);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "dataValues": Object {
          "description": "fakeDescription",
          "id": "123",
          "name": "Fakename",
        },
      }
    `);
    expect(mockCreate.mock.calls.length).toBe(1);
    mockCreate.mockClear();
    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
  });

  test('Testing: DummyDatasource.createDummy - error', async () => {
    const fakeDummy = { name: 'Fakename', description: 'fakeDescription' };
    const mockCreate = jest.fn(() => {
      throw new Error('Database Error');
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        create: mockCreate
      }
    };

    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    dummyDatasource.createDummy(fakeDummy).catch(error => {
      expect(error).toMatchInlineSnapshot(
        '[InternalDatabaseError: Database Error]'
      );
      expect(mockCreate.mock.calls.length).toBe(1);
      mockCreate.mockClear();
      mockLoggerInfo.mockClear();
      mockLoggerError.mockClear();
    });
  });

  test('Testing: DummyDatasource.updateDummy - success', async () => {
    const fakeDummyId = '1234';
    const fakeData = { name: 'otherfakeName' };
    const fakeDummy = { name: 'Fakename', description: 'fakeDescription' };
    const mockUpdate = jest.fn(() => {
      return { dataValues: { id: fakeDummyId, ...fakeDummy, ...fakeData } };
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        update: mockUpdate
      }
    };
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    const result = await dummyDatasource.updateDummy(fakeDummyId, fakeData);
    expect(result).toMatchInlineSnapshot(`
            Object {
              "dataValues": Object {
                "description": "fakeDescription",
                "id": "1234",
                "name": "otherfakeName",
              },
            }
        `);
    expect(mockUpdate.mock.calls.length).toBe(1);
    mockUpdate.mockClear();
    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
  });

  test('Testing: DummyDatasource.updateDummy - error', async () => {
    const fakeDummyId = '1234';
    const fakeData = { name: 'otherfakeName' };
    const mockUpdate = jest.fn(() => {
      throw new Error('Database Error');
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        update: mockUpdate
      }
    };
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    dummyDatasource.updateDummy(fakeDummyId, fakeData).catch(error => {
      expect(error).toMatchInlineSnapshot(
        '[InternalDatabaseError: Database Error]'
      );
      expect(mockUpdate.mock.calls.length).toBe(1);
      mockUpdate.mockClear();
      mockLoggerInfo.mockClear();
      mockLoggerError.mockClear();
    });
  });

  test('Testing: DummyDatasource.deleteDummy - success', async () => {
    const fakeDummyId = '1234';
    const mockDestroy = jest.fn(() => {
      return [1];
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        destroy: mockDestroy
      }
    };

    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    const result = await dummyDatasource.deleteDummy(fakeDummyId);
    expect(result).toMatchInlineSnapshot(`
            Array [
              1,
            ]
        `);
    expect(mockDestroy.mock.calls.length).toBe(1);
    mockDestroy.mockClear();
    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
  });

  test('Testing: DummyDatasource.deleteDummy - error', async () => {
    const fakeDummyId = '1234';
    const mockDestroy = jest.fn(() => {
      throw new Error('Database Error');
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        destroy: mockDestroy
      }
    };
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    dummyDatasource.deleteDummy(fakeDummyId).catch(error => {
      expect(error).toMatchInlineSnapshot(
        '[InternalDatabaseError: Database Error]'
      );
      expect(mockDestroy.mock.calls.length).toBe(1);
      mockDestroy.mockClear();
      mockLoggerInfo.mockClear();
      mockLoggerError.mockClear();
    });
  });

  test('Testing: DummyDatasource.getDummyById - success', async () => {
    const fakeDummyId = '1234';
    const fakeDummy = { name: 'Fakename', description: 'fakeDescription' };
    const mockFindOne = jest.fn(() => {
      return { dataValues: { id: fakeDummyId, ...fakeDummy } };
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        findOne: mockFindOne
      }
    };
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    const result = await dummyDatasource.getDummyById(fakeDummyId);
    expect(result).toMatchInlineSnapshot(`
            Object {
              "dataValues": Object {
                "description": "fakeDescription",
                "id": "1234",
                "name": "Fakename",
              },
            }
        `);
    expect(mockFindOne.mock.calls.length).toBe(1);
    mockFindOne.mockClear();
    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
  });

  test('Testing: DummyDatasource.getDummyById - error', async () => {
    const fakeDummyId = '1234';
    const mockFindOne = jest.fn(() => {
      throw new Error('Database Error');
    });
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {
      Dummy: {
        findOne: mockFindOne
      }
    };
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    dummyDatasource.getDummyById(fakeDummyId).catch(error => {
      expect(error).toMatchInlineSnapshot(
        '[InternalDatabaseError: Database Error]'
      );
      expect(mockFindOne.mock.calls.length).toBe(1);
      mockFindOne.mockClear();
      mockLoggerInfo.mockClear();
      mockLoggerError.mockClear();
    });
  });

  test('Testing: DummyDatasource.initialize', async () => {
    const fakeConfig = { context: 'fakeContext' };
    const mockLoggerInfo = jest.fn(() => { });
    const mockLoggerError = jest.fn(() => { });
    const fakeLogger = {
      info: mockLoggerInfo,
      error: mockLoggerError
    };
    const fakeDatabase = {};
    const dummyDatasource = new DummyDatasource(fakeDatabase, fakeLogger);
    expect(dummyDatasource.context).toBe(undefined);
    dummyDatasource.initialize(fakeConfig);
    expect(dummyDatasource.context).toMatchInlineSnapshot('"fakeContext"');

    mockLoggerInfo.mockClear();
    mockLoggerError.mockClear();
  });
});
