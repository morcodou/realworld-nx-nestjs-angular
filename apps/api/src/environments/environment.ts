import { IApiConfig } from '@realworld/shared/api/config';
const packageJson = require('../../../../package.json')

export const environment: IApiConfig = {
  production: false,
  applicationName: 'Sen Viet API',
  host: 'http://localhost',
  port: 3333,
  version: packageJson.version,
  debug: true,
  jwtSecret: 'jwtSecret',
  jwtExpiresIn: '1y'
};
