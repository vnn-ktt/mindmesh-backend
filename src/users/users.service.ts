import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {TUserCreateResponse, TUserLoginResponse} from "./types/t.response";
import {DatabaseService} from "../database/database.service";
import {TUserCreateDTO, TUserLoginDTO} from "./dto/user-dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService) {
    }

    async signup(payload: TUserCreateDTO): Promise<TUserCreateResponse> {
        const existingUser = await this.databaseService.user.findFirst({
            where: {
                email: payload.email
            }
        });
        if (existingUser) {
            throw new BadRequestException(
                'User already exists with the provided email.'
            );
        } else {
            payload.password = await this.#encryptPassword(payload.password, 10);
            return this.databaseService.user.create({
                data: payload,
                select: {
                    id: true,
                    email: true
                }
            });
        }
    }

    async login(payload: TUserLoginDTO): Promise<TUserLoginResponse> {
        const existingUser = await this.databaseService.user.findFirst({
            where: {
                email: payload.email
            }
        });
        if (!existingUser) {
            throw new UnauthorizedException(
                'User is not registered.'
            );
        } else {
            const passwordMatched: boolean = await this.#decryptPassword(payload.password, existingUser.password);
            if (!passwordMatched) {
                throw new UnauthorizedException(
                    'Passwords do not match.'
                );
            } else {
                const accessToken = await this.jwtService.signAsync(
                    {
                        email: existingUser.email,
                        id: existingUser.id
                    },
                    {
                        expiresIn: '1d'
                    }
                );
                return {accessToken};
            }
        }
    }

    async #encryptPassword(plainText: string, saltRounds: string | number): Promise<string> {
        return bcrypt.hash(plainText, saltRounds);
    }

    async #decryptPassword(plainText: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plainText, hash);
    }


    /* TODO: Save the user password in encrypted - bcryptjs
    *  TODO: Save the user in the DB, return id and email
    */
    // async encryptPassword(payload: UserDTO, saltRounds: Number): Promise<TResponse> {
    //     return await payload.password;
    // }
}