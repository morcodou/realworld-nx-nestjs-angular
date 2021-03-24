export abstract class ILoggingConfiguration {
    sendToCentralizedServer?: boolean
    sendToConsole: boolean
    logentriesToken?: string
    logglyToken?: string
}
export abstract class IRESTConfiguration {
    url: string
}

export abstract class IConfiguration {
    applicationName: string
    version: string
    production: boolean
    debug: boolean
    rest: IRESTConfiguration
    logging: ILoggingConfiguration
}
