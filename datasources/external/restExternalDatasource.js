const { RESTDataSource, HTTPCache } = require('apollo-datasource-rest');

class RestExternalDatasource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.EXTERNAL_API_URL;
  }

  willSendRequest(request) {
    const { auth } = this.context;
    request.headers.set('Authorization', auth.token);
  }

  initialize({ context }) {
    this.context = context;
    this.httpCache = new HTTPCache();
  }

  /**
 * Transform the raw data to JSON
 * @param {*} response
 */
  async parseBody(response) {
    // extend apollo server to parse jsonApi response as json
    const nativelyParsed = await super.parseBody(response);
    const contentType = response.headers.get('Content-Type');
    const ACCEPTED_TYPES = [
      'application/vnd.api+json',
      'application/vnd.api+json; charset=utf-8'
    ];

    if (ACCEPTED_TYPES.includes(contentType)) {
      return JSON.parse(nativelyParsed);
    }
    return nativelyParsed;
  }
}

module.exports = RestExternalDatasource;
