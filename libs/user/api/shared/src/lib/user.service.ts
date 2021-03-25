import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiConfigService } from '@realworld/shared/api/config';
import { DUPLICATE_RESOURCE_MSG, INVALID_ACCOUNT_MSG, NOT_FOUND_MSG } from '@realworld/shared/api/constants';
import { BaseService } from '@realworld/shared/api/foundation';
import { ILogin, IRegister, IUser } from '@realworld/user/api-interfaces';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserHelper } from './user.helper';

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

    async login(data: ILogin): Promise<IUser> {
        let user = await this.validateUser(data.email, data.password)
        return {
            ...user as IUser,
            token: await UserHelper.generateJWTToken(this.jwtService, {sub: user.username, email: user.email}),
        }
    }

    async register(data: IRegister) {
        let existingUser = await this.findOne(null, {where: [
            {email: data.email.toLowerCase()}, 
            {username: data.username.toLowerCase()}
        ]})

        if (existingUser) {
            throw new BadRequestException(DUPLICATE_RESOURCE_MSG)
        }

        let user: Partial<User> = {...data}
        user.password = await UserHelper.hashPassword(user.password)
        let result = await this.insert(user)
        return result
    }

    async updateUserInfo(username: string, data: IUser) {
        let user = await this.findOne({isEnabled: true, username: username})
        if (!user) {
            throw new BadRequestException(INVALID_ACCOUNT_MSG)
        }
        
        if (data.password) {
            data.password = await UserHelper.hashPassword(data.password)
        }

        return await this.update(
            {username: username}, 
            data
        )
    }

    private async validateUser(emailLogin: string, passwordLogin: string): Promise<Partial<IUser>> {
        const user = await this.findOne({
            email: emailLogin.toLowerCase().trim(), 
            isEnabled: true
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
}
