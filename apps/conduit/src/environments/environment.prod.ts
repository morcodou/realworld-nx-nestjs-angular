import { IConfiguration } from '@realworld/shared/configuration';
const packageJson = require('../../../../package.json')

export const environment: Partial<IConfiguration> = {
  applicationName: 'Conduit',
  version: packageJson.version,
  production: true,
  debug: false,
  rest: {
    url: 'http://localhost:3333/api'
  },
  logging: {
    sendToCentralizedServer: true,
    sendToConsole: false
  },
}
