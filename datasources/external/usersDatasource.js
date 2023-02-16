const RestExternalDatasource = require('./restExternalDatasource');

class UsersDatasource extends RestExternalDatasource {
  constructor() {
    super();
    this.baseURL = process.env.EXTERNAL_API_URL;
  }

  async getUserProfile() {
    const response = await this.get('users/me');
    const { data } = response;
    const { attributes } = data;
    const user = {
      id: data.id,
      ...attributes
    };
    return user;
  }
}

module.exports = UsersDatasource;
