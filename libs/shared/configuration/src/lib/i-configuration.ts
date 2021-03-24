export abstract class ILoggingConfiguration {
    sendToCentralizedServer?: boolean
    sendToConsole: boolean
    logentriesToken?: string
    logglyToken?: string
}
export abstract class IRESTConfiguration {
    url: string
}
export abstract class IFirebaseConfiguration {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
}

export abstract class ITiny {
    apiKey: string
}
export abstract class ISeoData {
    defaultTitle?: string;
    defaultKeywords?: string;
    defaultDescription?: string;
    defaultImage?: string;
    rootUrl?: string;
}

export abstract class IAnalyticsConfiguration {
    googleAnalyticsTrackingCode: string;
}

export abstract class IConfiguration {
    applicationName: string
    version: string
    production: boolean
    debug: boolean
    seoData: ISeoData
    rest: IRESTConfiguration
    tiny: ITiny
    firebase: IFirebaseConfiguration
    logging: ILoggingConfiguration
    analytics: IAnalyticsConfiguration
}
