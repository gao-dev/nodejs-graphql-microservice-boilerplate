const Joi = require('joi');
const AddDummyService = require('../addDummyService');
const { InternalServerError } = require('../../utils/errors');

describe('[services]: AddDummyService unit tests', () => {
  test('Testing: AddDummyService.inputValidation - success', async () => {
    const fakeAddDummyInput = {
      name: 'Dummy name',
      description: 'a fake description'
    };

    const mockCreateDummy = jest.fn(dummy => {
      return { ...dummy, id: '123' };
    });

    const fakeContext = {
      dataSources: {
        dummyDatasource: {
          createDummy: mockCreateDummy
        }
      }
    };

    const mockGetInputSchema = jest.fn(() => {
      Joi.object().keys({
        name: Joi.string()
          .min(3)
          .required(),
        description: Joi.string()
      });
    });

    jest.spyOn(AddDummyService.prototype, 'getInputSchema');
    AddDummyService.getInputSchema = mockGetInputSchema;

    const service = await new AddDummyService(fakeContext);
    const result = service.inputIsValid(fakeAddDummyInput);
    expect(result).toEqual(true);
    mockGetInputSchema.mockClear();
  });

  test('Testing: AddDummyService.inputValidation - error', () => {
    const fakeBadAddDummyInput = {
      description: 'a fake description'
    };

    const mockCreateDummy = jest.fn(dummy => {
      return { ...dummy, id: '123' };
    });

    const fakeContext = {
      dataSources: {
        dummyDatasource: {
          createDummy: mockCreateDummy
        }
      }
    };

    const mockGetInputSchema = jest.fn(() => {
      Joi.object().keys({
        name: Joi.string()
          .min(3)
          .required(),
        description: Joi.string()
      });
    });

    jest.spyOn(AddDummyService.prototype, 'getInputSchema');
    AddDummyService.getInputSchema = mockGetInputSchema;
    const service = new AddDummyService(fakeContext);
    try {
      service.inputIsValid(fakeBadAddDummyInput);
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        '[InputValidationError: child "name" fails because ["name" is required]]'
      );
      mockGetInputSchema.mockClear();
    }
  });

  test('Testing: AddDummyService.parse - success', () => {
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
    const result = AddDummyService.parse(fakeDummy, fakeUser);
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

  test('Testing: addDummyService.action - success', async () => {
    const fakeUser = {
      id: '111111',
      first_name: 'Gustavo',
      last_name: 'Olmedo'
    };
    const fakeDummy = {
      name: 'dummy name 01',
      description: 'a fake description'
    };

    const mockCreateDummy = jest.fn(dummy => {
      return { ...dummy, id: '123' };
    });

    const context = {
      dataSources: {
        dummyDatasource: {
          createDummy: mockCreateDummy
        }
      }
    };
    const service = await new AddDummyService(context);
    const result = await service.action(fakeDummy, fakeUser);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "description": "a fake description",
        "id": "123",
        "name": "dummy name 01",
        "owner": "111111",
      }
    `);
    mockCreateDummy.mockClear();
  });

  test('Testing: addDummyService.action - error', async () => {
    const fakeUser = {
      id: '111111',
      first_name: 'Gustavo',
      last_name: 'Olmedo'
    };
    const fakeDummy = {
      name: 'dummy name 01',
      description: 'a fake description'
    };

    const mockCreateDummy = jest.fn(() => {
      throw new Error('createDummy Error');
    });
    const context = {
      dataSources: {
        dummyDatasource: {
          createDummy: mockCreateDummy
        }
      }
    };
    const service = new AddDummyService(context);
    service.action(fakeDummy, fakeUser).catch(error => {
      expect(error).toMatchInlineSnapshot('[Error: createDummy Error]');
      mockCreateDummy.mockClear();
    });
  });

  test('Testing: addDummyService.execute - success', async () => {
    const fakeAddDummyInput = {
      name: 'fake name 01',
      description: 'fake description 01'
    };
    const mockAction = jest.fn((addDummyInput, user) => {
      return { ...addDummyInput, id: '123', owner: user };
    });
    const mockParse = jest.fn(() => {
      return { id: '123', ...fakeAddDummyInput };
    });

    jest.spyOn(AddDummyService, 'parse');
    AddDummyService.parse = mockParse;
    const context = {
      dataSources: {}
    };
    const service = await new AddDummyService(context);
    service.action = mockAction;

    const result = await service.execute(fakeAddDummyInput);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "description": "fake description 01",
        "id": "123",
        "name": "fake name 01",
      }
    `);
    mockParse.mockClear();
    mockAction.mockClear();
  });

  test('Testing: addDummyService.execute - weird error', async () => {
    const fakeAddDummyInput = {
      name: 'fake name 01',
      description: 'fake description 01'
    };
    const mockAction = jest.fn((addDummyInput, user) => {
      return { ...addDummyInput, id: '123', owner: user };
    });
    const mockParse = jest.fn(() => {
      throw new Error('Weird Fake Error');
    });

    jest.spyOn(AddDummyService, 'parse');
    AddDummyService.parse = mockParse;
    const context = {
      dataSources: {}
    };
    const service = await new AddDummyService(context);
    service.action = mockAction;

    service.execute(fakeAddDummyInput).catch(error => {
      expect(error).toMatchInlineSnapshot('[Error: Weird Fake Error]');
      mockParse.mockClear();
      mockAction.mockClear();
    });
  });

  test('Testing: addDummyService.execute - expected error', async () => {
    const fakeAddDummyInput = {
      name: 'fake name 01',
      description: 'fake description 01'
    };
    const mockAction = jest.fn(() => {
      throw new InternalServerError(new Error(' Fake Error'));
    });
    const mockParse = jest.fn(() => {
      throw new InternalServerError(new Error(' Fake Error'));
    });

    jest.spyOn(AddDummyService, 'parse');
    AddDummyService.parse = mockParse;
    const context = {
      dataSources: {}
    };
    const service = await new AddDummyService(context);
    service.action = mockAction;

    await service.execute(fakeAddDummyInput).catch(error => {
      expect(error).toMatchInlineSnapshot('[InternalServerError:  Fake Error]');
      mockParse.mockClear();
      mockAction.mockClear();
    });
  });

  test('Testing: addDummyService.execute - another weird error', async () => {
    const fakeAddDummyInput = {
      name: 'fake name 01',
      description: 'fake description 01'
    };
    const mockAction = jest.fn((addDummyInput, user) => {
      return { ...addDummyInput, id: '123', owner: user };
    });
    const mockParse = jest.fn(() => {
      return { id: '123', ...fakeAddDummyInput };
    });

    const mockInputIsValid = jest.fn(() => null);

    jest.spyOn(AddDummyService.prototype, 'inputIsValid');
    AddDummyService.prototype.inputIsValid = mockInputIsValid;
    jest.spyOn(AddDummyService, 'parse');
    AddDummyService.parse = mockParse;
    const context = {
      dataSources: {}
    };
    const service = await new AddDummyService(context);
    service.action = mockAction;
    const result = await service.execute(fakeAddDummyInput);
    expect(result).toEqual(null);
    mockParse.mockClear();
    mockAction.mockClear();
    mockInputIsValid.mockClear();
  });
});
