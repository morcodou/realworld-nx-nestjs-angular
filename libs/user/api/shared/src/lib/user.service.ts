import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DUPLICATE_RESOURCE_MSG, INVALID_ACCOUNT_MSG, NOT_FOUND_MSG } from '@realworld/shared/api/constants';
import { BaseService } from '@realworld/shared/api/foundation';
import { ILoginUser, INewUser, IProfile, IUpdateUser, IUser } from '@realworld/user/api-interfaces';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { FollowService } from './follow.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        repository: Repository<User>,
        private jwtService: JwtService,
        private followService: FollowService
    ) {
        super()
        this.repository = repository
    }

    async login(data: ILoginUser): Promise<IUser> {
        let user = await this.validateUser(data.email, data.password)
        return {
            ...user as IUser,
            token: await this.generateJWTToken({sub: user.id, email: user.email, username: user.username}),
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
            token: await this.generateJWTToken({sub: user.id, email: user.email, username: user.username}),
        }
    }

    async updateUserInfo(userId: string, data: Partial<IUpdateUser>) {
        const user = await this.findOne({id: userId})
        if (!user) {
            throw new BadRequestException(INVALID_ACCOUNT_MSG)
        }
        
        if (data.password) {
            data.password = await this.hashPassword(data.password)
        } else {
            delete data.password
        }

        await this.update({id: userId}, data)
        const newUserInfo = {...user, ...data}

        return {
            ...newUserInfo, 
            password: null,
            token: await this.generateJWTToken({sub: userId, email: newUserInfo.email, username: newUserInfo.username}),
        }
    }

    async getProfile(requestUserId: string, user: User): Promise<IProfile> {
        return {
            username: user.username,
            bio: user.bio,
            image: user.image,
            following: !requestUserId ? false : !!(await this.followService.findOne({
                followerId: requestUserId, 
                followedId: user.id
            })),
            createdAt: user.createdAt
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
        const {password, email, username, bio, image, id, ..._} = user

        const validPass = await bcrypt.compare(passwordLogin, password)
        if(!validPass) {
            throw new BadRequestException(INVALID_ACCOUNT_MSG)
        }

        return { id, email, username, bio, image }
    }

    private async hashPassword(raw: string): Promise<string> {
        return await bcrypt.hash(raw, 10)
    }

    private async generateJWTToken(data: {
        sub: string
        email: string,
        username: string
    }): Promise<string> {
        return this.jwtService.sign(data)
    }

    getJwtInfo(req): {sub: string, email: string, username: string, iat: number, exp: number}|null {
        if (!req?.headers?.authorization) {
            return null
        }
        const authArr: string[] = req?.headers?.authorization.split(' ')
        if (authArr.length !== 2) {
            return null
        }
        return this.jwtService.decode(authArr[1]) as any
    }
}
