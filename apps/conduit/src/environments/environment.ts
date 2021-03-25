import { IConfiguration } from '@realworld/shared/configuration';
const packageJson = require('../../../../package.json')

export const environment: Partial<IConfiguration> = {
  applicationName: 'Conduit',
  version: packageJson.version,
  production: false,
  debug: true,
  rest: {
    url: 'http://localhost:3333/api'
  },
  logging: {
    sendToCentralizedServer: false,
    sendToConsole: true
  },
}
