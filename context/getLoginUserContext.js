const { AuthenticationError } = require('apollo-server');

class GetLoginUserContext {
  constructor({ usersDatasource }) {
    this.usersDatasource = usersDatasource;
  }

  async fetchUserProfile() {
    // try {
    // const user = await this.usersDatasource.getUserProfile();
    // return user;
    return {};

    // } catch (error) {
    //     throw new AuthenticationError('Unauthenticated');
    // }
  }
}

module.exports = GetLoginUserContext;
