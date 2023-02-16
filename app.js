require('dotenv').config();

const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');

const server = require('./graphql/server');

const app = express();

server.applyMiddleware({ app });

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg:
      'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}} \r\n', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute () {
      return false;
    } // optional: allows to skip some log messages based on request and/or response
  })
);

app.use(express.json());

app.get('/health', (req, res) => res.send({ status: 'OK' }));
app.get('/ping', (req, res) => res.status(200).send('PONG'));
app.get('/', (req, res) => res.send({ msg: 'FeatureName Microservice' }));

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => {
  console.log(`
    🚀... Server ready! on ${HOST}:${PORT}
    🚀... Playground URL: http://${HOST}:${PORT}/graphql
    `);
});

module.exports = app;