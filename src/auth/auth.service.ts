import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UserCreateDTO, UserLoginDTO} from "../common/dto/user-dto";
import {TUserCreateResponse, TUserLoginResponse} from "../common/types/users/t.response";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService) {
    }

    async register(payload: UserCreateDTO): Promise<TUserCreateResponse> {
        const existingUser = await this.usersService.findByEmail(payload.email);
        if (existingUser) {
            throw new BadRequestException(
                'User already registered with the provided email'
            );
        } else {
            payload.password = await this.encryptPassword(payload.password, 10);
            return this.usersService.createInDatabase(payload);
        }
    }

    async login(payload: UserLoginDTO): Promise<TUserLoginResponse> {
        const existingUser = await this.usersService.findByEmail(payload.email);
        if (!existingUser) {
            throw new UnauthorizedException(
                'User is not registered'
            );
        } else {
            const passwordMatched: boolean = await this.decryptPassword(payload.password, existingUser.password);
            if (!passwordMatched) {
                throw new UnauthorizedException(
                    'Passwords do not match'
                );
            } else {
                const accessToken = await this.jwtService.signAsync(
                    {
                        email: existingUser.email,
                        id: existingUser.id
                    },
                    {
                        expiresIn: '15m'
                    }
                );
                return {accessToken};
            }
        }
    }

    private async encryptPassword(plainText: string, saltRounds: string | number): Promise<string> {
        return bcrypt.hash(plainText, saltRounds);
    }

    private async decryptPassword(plainText: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    }
}