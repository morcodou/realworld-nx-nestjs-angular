export abstract class IApiConfig {
    applicationName?: string
    host?: string
    port?: number
    version?: string
    jwtSecret?: string
    jwtExpiresIn?: string
    production?: boolean
    debug?: boolean
    webURL?: string
}