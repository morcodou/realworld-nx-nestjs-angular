export abstract class IFirebaseConfig { 
    "type": string
    "project_id": string
    "private_key_id": string
    "private_key": string
    "client_email": string
    "client_id": string
    "auth_uri": string
    "token_uri": string
    "auth_provider_x509_cert_url": string
    "client_x509_cert_url": string
}

export abstract class IMailerConfig {
    host: string
    sender: string
    port: number
    secure: boolean // true for 465, false for other ports
    auth: {
        user: string
        pass: string
    }
}

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
    portalURL?: string
    firebase?: IFirebaseConfig
    mailer?: IMailerConfig
}