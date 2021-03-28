import { Body, Controller, Get, NotAcceptableException, Post, Put, Req } from '@nestjs/common';
import { LOGGED_IN_MSG, REGISTERED_MSG, UPDATED_MSG } from '@realworld/shared/api/constants';
import { ActionSuccessResponse, DetailSuccessResponse, IResponse } from '@realworld/shared/client-server';
import { IUpdateUser, IUser, ILoginUser, INewUser } from '@realworld/user/api-interfaces';
import { SkipAuth, UserService } from '@realworld/user/api/shared';

@Controller()
export class UserApiHandlersController {
    constructor(private userService: UserService) { }

    @SkipAuth()
    @Post('users/login')
    async login(@Body() data: ILoginUser): Promise<IResponse<IUser>> {
        const user = await this.userService.login(data)
        return new ActionSuccessResponse<Partial<IUser>>({
            message: LOGGED_IN_MSG,
            data: user
        })
    }

    @SkipAuth()
    @Post('users')
    async register(@Body() data: INewUser): Promise<IResponse<IUser>> {
        const user = await this.userService.register(data)
        return new ActionSuccessResponse<Partial<IUser>>({
            message: REGISTERED_MSG,
            data: user
        })
    }

    @Put('users')
    async update(@Req() req, @Body() data: Partial<IUpdateUser>) {
        const user = await this.userService.updateUserInfo(req?.user?.sub, data)
        return new ActionSuccessResponse<Partial<IUser>>({
            message: UPDATED_MSG,
            data: user
        })
    }

    @Get('user')
    async getCurrentUser(@Req() req) {
        const {password, ...user} = (await this.userService.findOne({id: req?.user?.sub})) || {}

        return new DetailSuccessResponse<Partial<IUser>>({
            detailData: user
        })
    }
}
