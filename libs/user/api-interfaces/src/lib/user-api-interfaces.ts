import { IsEmail, IsNotEmpty, IsUrl, MaxLength } from 'class-validator';
// Login
export abstract class ILoginUser {
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
} 

export abstract class ILoginUserRequest {
    user: ILoginUser
} 

// Register
export abstract class INewUser {
    @MaxLength(255)
    username: string
    @IsEmail()
    @MaxLength(255)
    email: string
    @IsNotEmpty()
    @MaxLength(200)
    password: string
} 

export abstract class INewUserRequest {
    user: INewUser
} 

// User response
export abstract class IUser {
    username: string
    email: string
    token: string
    bio: string
    image: string
} 

export abstract class IUserResponse {
    user: IUser
} 

// Update user
export abstract class IUpdateUser {
    @MaxLength(255)
    username: string
    @IsEmail()
    @MaxLength(255)
    email: string
    @IsNotEmpty()
    @MaxLength(255)
    password: string
    @MaxLength(1000)
    bio: string
    @IsUrl()
    image: string
} 

export abstract class IUpdateUserRequest {
    user: IUpdateUser
} 

// Profile
export abstract class IProfile {
    username: string
    bio: string
    image: string
    following: boolean
} 

export abstract class IProfileResponse {
    profile: IProfile
} 