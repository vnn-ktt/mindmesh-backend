import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator'

class UserDTO {
    @IsOptional()
    @IsString({
        message: 'The firstname should be a string.'
    })
    firstName?: string;
    @IsOptional()
    @IsString({
        message: 'The lastname should be a string.'
    })
    lastName?: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString({
        message: 'The password should be a string.'
    })
    password: string;
    @IsOptional()
    @IsBoolean({
        message: 'The block parameter should be a boolean.'
    })
    blocked: boolean;
}

class UserLoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString({
        message: 'The password should be a string.'
    })
    password: string;
}

export type TUserCreateDTO = UserDTO;
export type TUserLoginDTO = UserLoginDTO;
export type TUserUpdateDTO = Partial<UserDTO>;
export type TUserDeleteDTO = Partial<UserDTO>;