import {Injectable} from "@nestjs/common";
import {TUserCreateResponse, TUserSelectResponse} from "../common/types/users/t.response";
import {DatabaseService} from "../database/database.service";
import {UserCreateDTO} from "../common/dto/user-dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwtService: JwtService) {
    }

    public async createInDatabase(payload: UserCreateDTO): Promise<TUserCreateResponse> {
        return this.databaseService.user.create({
            data: payload,
            select: {
                id: true,
                email: true
            }
        });
    }

    public async findByEmail(email: string): Promise<TUserSelectResponse | null> {
        return this.databaseService.user.findFirst({
            where: {
                email: email
            }
        }) ?? null;
    }
}