import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class CreateUserDTO {
    @IsOptional()
    @IsString()
    firstName?: string;
    @IsOptional()
    @IsString()
    lastName?: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsOptional()
    @IsBoolean()
    blocked: boolean;
}