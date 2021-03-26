import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiConfigService } from '@realworld/shared/api/config';
import { DUPLICATE_RESOURCE_MSG, INVALID_ACCOUNT_MSG, NOT_FOUND_MSG } from '@realworld/shared/api/constants';
import { BaseService } from '@realworld/shared/api/foundation';
import { IUpdateUser, IUser, ILoginUser, INewUser } from '@realworld/user/api-interfaces';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
        private configService: ApiConfigService,
        private jwtService: JwtService,
    ) {
        super()
        this.repository = repository
    }

    async login(data: ILoginUser): Promise<IUser> {
        let user = await this.validateUser(data.email, data.password)
        return {
            ...user as IUser,
            token: await this.generateJWTToken({sub: user.username, email: user.email}),
        }
    }

    async register(data: INewUser) {
        const existingUser = await this.findOne(null, {where: [
            {email: data.email.toLowerCase()}, 
            {username: data.username.toLowerCase()}
        ]})

        if (existingUser) {
            throw new BadRequestException(DUPLICATE_RESOURCE_MSG)
        }

        let user: Partial<User> = {...data}
        user.password = await this.hashPassword(user.password)
        await this.insert(user)
        return {
            ...user,
            password: null,
            token: await this.generateJWTToken({sub: user.username, email: user.email}),
        }
    }

    async updateUserInfo(username: string, data: Partial<IUpdateUser>) {
        const user = await this.findOne({username: username})
        if (!user) {
            throw new BadRequestException(INVALID_ACCOUNT_MSG)
        }
        
        if (data.password) {
            data.password = await this.hashPassword(data.password)
        } else {
            delete data.password
        }

        await this.update({username: username}, data)
        const newUserInfo = {...user, ...data}

        return {
            ...newUserInfo, 
            password: null,
            token: await this.generateJWTToken({sub: newUserInfo.username, email: newUserInfo.email}),
        }
    }

    private async validateUser(emailLogin: string, passwordLogin: string): Promise<Partial<IUser>> {
        const user = await this.findOne({
            email: emailLogin.toLowerCase().trim()
        })
        if(!user) {
            throw new NotFoundException(NOT_FOUND_MSG)
        }

        // strip out unnecessary fields
        const {password, email, username, bio, image, ..._} = user

        const validPass = await bcrypt.compare(passwordLogin, password)
        if(!validPass) {
            throw new BadRequestException(INVALID_ACCOUNT_MSG)
        }

        return { email, username, bio, image }
    }

    async hashPassword(raw: string): Promise<string> {
        return await bcrypt.hash(raw, 10)
    }

    async generateConfirmToken(email: string): Promise<string> {
        let res = await bcrypt.hash(email + new Date().getTime(), 10);
        return this.toBase64(res)
    }

    toBase64(token: string): string {
        return Buffer.from(token).toString('base64')
    }

    fromBase64(token: string): string {
        return Buffer.from(token, 'base64').toString('ascii')
    }

    async generateJWTToken(data: {
        sub: string
        email: string
    }): Promise<string> {
        const jwtPayload = { 
            email: data.email, 
            sub: data.sub
        }

        return this.jwtService.sign(jwtPayload)
    }
}
