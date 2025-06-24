import {Injectable} from "@nestjs/common";
import {CreateUserDTO} from "./dto/create-user-dto";
import {SignupResponse} from "./types/signup-response";

@Injectable()
export class UsersService {
    async signup(payload: CreateUserDTO): Promise<SignupResponse> {
        /* TODO: Save the user password in encrypted - bcryptjs
        *  TODO: Save the user in the DB, return id and email
        */
    }
}