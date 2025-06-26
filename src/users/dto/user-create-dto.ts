import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class UserCreateDTO {
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

export type TUserUpdateDTO = Partial<UserCreateDTO>;