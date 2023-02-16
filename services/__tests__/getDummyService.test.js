const Joi = require('joi');
const GetDummyService = require('../getDummyService');

describe('[services]: GetDummyService unit tests', () => {
  test('Testing: GetDummyService.inputValidation - success', () => {
    const fakeDummyId = 123;

    const fakeContext = {
      dataSources: {
        dummyDatasource: {}
      }
    };
    const mockGetInputSchema = jest.fn(() => {
      Joi.number().required();
    });
    jest.spyOn(GetDummyService.prototype, 'getInputSchema');
    GetDummyService.getInputSchema = mockGetInputSchema;

    const service = new GetDummyService(fakeContext);
    const result = service.inputIsValid(fakeDummyId);
    expect(result).toEqual(true);
    mockGetInputSchema.mockClear();
  });

  test('Testing: GetDummyService.inputValidation - error', () => {
    const fakeDummyId = 123;
    const mockGetInputSchema = jest.fn(() => {
      Joi.number().required();
    });
    const fakeContext = {
      dataSources: {
        dummyDatasource: {}
      }
    };
    jest.spyOn(GetDummyService.prototype, 'getInputSchema');
    GetDummyService.getInputSchema = mockGetInputSchema;

    const service = new GetDummyService(fakeContext);

    try {
      service.inputIsValid(fakeDummyId);
    } catch (error) {
      mockGetInputSchema.mockClear();
      expect(error).toMatchInlineSnapshot(
        '[ValidationError: "value" must be a number]'
      );
    }
  });

  test('Testing: GetDummyService.parse - success', () => {
    const fakeDummy = {
      dataValues: {
        id: '123',
        name: 'Guide name',
        description: 'a fake description'
      }
    };
    const fakeUser = {
      id: '111111',
      first_name: 'Gustavo',
      last_name: 'Olmedo'
    };
    const result = GetDummyService.parse(fakeDummy, fakeUser);
    expect(result).toMatchInlineSnapshot(`
                  Object {
                    "description": "a fake description",
                    "id": "123",
                    "name": "Guide name",
                    "owner": Object {
                      "first_name": "Gustavo",
                      "id": "111111",
                      "last_name": "Olmedo",
                    },
                  }
            `);
  });

  test('Testing: GetDummyService.parse - error', () => {
    const fakeDummy = {
      dataValues: {}
    };
    const fakeUser = {};
    const result = GetDummyService.parse(fakeDummy, fakeUser);
    expect(result).toMatchInlineSnapshot(`
                    Object {
                      "description": undefined,
                      "id": undefined,
                      "name": undefined,
                      "owner": Object {},
                    }
            `);
  });

  test('Testing: GetDummyService.action - success', async () => {
    const fakeDummyId = '123123123123123123123123';
    const fakeDummy = {
      name: 'dummy name 01',
      description: 'a fake description'
    };
    const fakeUser = {
      id: '111111',
      first_name: 'Gustavo',
      last_name: 'Olmedo'
    };
    const mockGetDummyById = jest.fn(() => {
      return { ...fakeDummy, id: fakeDummyId };
    });
    const mockInputIsValid = jest.fn(() => true);
    jest.spyOn(GetDummyService.prototype, 'inputIsValid');
    GetDummyService.prototype.inputIsValid = mockInputIsValid;

    const context = {
      dataSources: {
        dummyDatasource: {
          getDummyById: mockGetDummyById
        }
      }
    };
    const service = await new GetDummyService(context);
    const result = await service.action(fakeDummyId, fakeUser);
    expect(result).toMatchInlineSnapshot(`
                  Object {
                    "description": "a fake description",
                    "id": "123123123123123123123123",
                    "name": "dummy name 01",
                  }
            `);
    mockInputIsValid.mockClear();
    mockGetDummyById.mockClear();
  });

  test('Testing: GetDummyService.action - false', async () => {
    const fakeDummyId = '123123123123123123123123';
    const fakeDummy = {
      name: 'dummy name 01',
      description: 'a fake description'
    };
    const mockGetDummyById = jest.fn(() => {
      return { ...fakeDummy, id: fakeDummyId };
    });
    const mockInputIsValid = jest.fn(() => false);
    jest.spyOn(GetDummyService.prototype, 'inputIsValid');
    GetDummyService.prototype.inputIsValid = mockInputIsValid;

    const context = {
      dataSources: {
        dummyDatasource: {
          getDummyById: mockGetDummyById
        }
      }
    };
    const service = await new GetDummyService(context);

    const result = await service.action(fakeDummyId);
    expect(result).toEqual(null);
    mockInputIsValid.mockClear();
    mockGetDummyById.mockClear();
  });

  test('Testing: GetDummyService.action - not found', async () => {
    const fakeDummyId = '123123123123123123123123';

    const mockInputIsValid = jest.fn(() => true);
    jest.spyOn(GetDummyService.prototype, 'inputIsValid');
    GetDummyService.prototype.inputIsValid = mockInputIsValid;
    const mockGetDummyById = jest.fn(() => null);

    const context = {
      dataSources: {
        dummyDatasource: {
          getDummyById: mockGetDummyById
        }
      }
    };
    const service = await new GetDummyService(context);

    service.action(fakeDummyId).catch(error => {
      expect(error).toMatchInlineSnapshot(
        '[InternalServerError: Dummy(123123123123123123123123) not found.]'
      );
      mockInputIsValid.mockClear();
      mockGetDummyById.mockClear();
    });
  });

  test('Testing: GetDummyService.action - error', async () => {
    const fakeDummyId = '123123123123123123123123';

    const mockGetDummyById = jest.fn(() => null);

    const mockInputIsValid = jest.fn(() => {
      throw new Error('Weird Fake Error');
    });
    jest.spyOn(GetDummyService.prototype, 'inputIsValid');
    GetDummyService.prototype.inputIsValid = mockInputIsValid;

    const context = {
      dataSources: {
        dummyDatasource: {
          getDummyById: mockGetDummyById
        }
      }
    };
    const service = await new GetDummyService(context);

    service.action(fakeDummyId).catch(error => {
      expect(error).toMatchInlineSnapshot('[Error: Weird Fake Error]');
      mockInputIsValid.mockClear();
      mockGetDummyById.mockClear();
    });
  });

  test('Testing: GetDummyService.execute', async () => {
    const fakeDummyId = '123123123123123123123123';
    const fakeDummy = {
      id: fakeDummyId,
      name: 'fake name',
      description: 'fake description'
    };
    const mockAction = jest.fn(() => {
      return fakeDummy;
    });
    const mockParse = jest.fn((dummy, user) => {
      return { ...fakeDummy, owner: user };
    });

    jest.spyOn(GetDummyService, 'parse');
    GetDummyService.parse = mockParse;
    const context = {
      dataSources: {}
    };
    const service = await new GetDummyService(context);
    service.action = mockAction;
    const result = await service.execute(fakeDummyId);
    expect(result).toMatchInlineSnapshot(`
                              Object {
                                "description": "fake description",
                                "id": "123123123123123123123123",
                                "name": "fake name",
                                "owner": Object {
                                  "first_name": "Gustavo",
                                  "id": "111111",
                                  "last_name": "Olmedo",
                                },
                              }
            `);
    mockParse.mockClear();
    mockAction.mockClear();
  });
});
