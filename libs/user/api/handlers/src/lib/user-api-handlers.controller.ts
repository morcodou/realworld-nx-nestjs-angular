import { Body, Controller, NotAcceptableException, Post, Put, Req } from '@nestjs/common';
import { LOGGED_IN_MSG, REGISTERED_MSG, UPDATED_MSG } from '@realworld/shared/api/constants';
import { ActionSuccessResponse, IResponse } from '@realworld/shared/client-server';
import { IUpdateUser, IUser, ILoginUser, INewUser } from '@realworld/user/api-interfaces';
import { SkipAuth, UserService } from '@realworld/user/api/shared';

@Controller()
export class UserApiHandlersController {
    constructor(private userService: UserService) { }

    @SkipAuth()
    @Post('users/login')
    async login(@Body() data: ILoginUser): Promise<IResponse<IUser>> {
        const user = await this.userService.login(data)
        return new ActionSuccessResponse<IUser>({
            id: user.username,
            message: LOGGED_IN_MSG,
            data: user
        })
    }

    @SkipAuth()
    @Post('users')
    async register(@Body() data: INewUser): Promise<IResponse<IUser>> {
        const user = await this.userService.register(data)
        return new ActionSuccessResponse<IUser>({
            id: user.username,
            message: REGISTERED_MSG,
            data: user
        })
    }

    @Put('users')
    async update(@Req() req, @Body() data: IUpdateUser) {
        if (req?.user?.sub !== data?.username) {
            throw new NotAcceptableException()
        }

        const user = await this.userService.updateUserInfo(req?.user?.sub, data)
        return new ActionSuccessResponse({
            id: data.username,
            message: UPDATED_MSG,
            data: user
        })
    }
}
