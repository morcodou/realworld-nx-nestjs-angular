import * as bcrypt from 'bcrypt';

export class UserHelper {
    static async hashPassword(raw: string): Promise<string> {
        return await bcrypt.hash(raw, 10)
    }
    
    static async generateJWTToken(jwtService, data: {
        sub: string
        email: string,
    }): Promise<string> {
        const jwtPayload = { 
            email: data.email, 
            sub: data.sub,
        }

        return jwtService.sign(jwtPayload)
    }
}