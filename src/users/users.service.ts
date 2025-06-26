import {BadRequestException, Injectable} from "@nestjs/common";
import {SignupResponse} from "./types/signup-response";
import {DatabaseService} from "../database/database.service";
import {UserCreateDTO} from "./dto/user-create-dto";

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {
    }


    async signup(payload: UserCreateDTO): Promise<SignupResponse> {
        const existingUser = await this.databaseService.user.findFirst({
            where: {
                email: payload.email
            }
        });

        if (existingUser) {
            throw new BadRequestException(
                'User already exists with the provided email.'
            );
        }

        return this.databaseService.user.create({
            data: payload,
            select: {
                id: true,
                email: true
            }
        });
    }

    /* TODO: Save the user password in encrypted - bcryptjs
    *  TODO: Save the user in the DB, return id and email
    */
    // async encryptPassword(payload: CreateUserDTO, saltRounds: Number): Promise<SignupResponse> {
    //     return await payload.password;
    // }
}