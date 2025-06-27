import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {TUserCreateDTO, TUserLoginDTO} from "./dto/user-dto";
import {UsersService} from "./users.service";
import {AuthGuard} from "../conception/guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/signup')
    @UseGuards(AuthGuard)
    create(
        @Body()
        createUserDTO: TUserCreateDTO,
    ) {
        return this.usersService.signup(createUserDTO);
    }

    @Post('/login')
    async login(
        @Body()
        userLoginDTO: TUserLoginDTO) {
        return this.usersService.login(userLoginDTO);
    }
}