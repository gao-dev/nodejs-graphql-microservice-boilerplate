const InternalDatasource = require('./internalDatasource');

class DummyDatasource extends InternalDatasource {
  wrapper() {
    this.name = 'DummyDatasource';
    this.modelName = 'Dummy';

    this.createDummy = this.wrap(DummyDatasource._createDummy);
    this.updateDummy = this.wrap(DummyDatasource._updateDummy);
    this.deleteDummy = this.wrap(DummyDatasource._deleteDummy);
    this.getDummyById = this.wrap(DummyDatasource._getDummyById);
  }

  static async _createDummy(database, dummy) {
    const currentTimestamp = new Date().getTime();
    const result = await database.Dummy.create({
      name: dummy.name,
      description: dummy.description,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp
    });
    return result;
  }

  static async _updateDummy(database, dummyId, data) {
    const currentTimestamp = new Date().getTime();
    const result = await database.Dummy.update(
      { data },
      {
        where: {
          id: dummyId,
          updatedAt: currentTimestamp
        }
      }
    );
    return result;
  }

  static async _deleteDummy(database, dummyId) {
    const result = await database.Dummy.destroy({
      where: {
        id: dummyId
      }
    });
    return result;
  }

  static async _getDummyById(database, dummyId) {
    const result = await database.Dummy.findOne({
      where: {
        id: dummyId
      }
    });
    return result;
  }
}

module.exports = DummyDatasource;
