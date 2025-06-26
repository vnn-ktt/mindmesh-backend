import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {UserCreateDTO} from "./dto/user-create-dto";
import {UsersService} from "./users.service";
import {AuthGuard} from "../conception/guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/signup')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }))
    @UseGuards(AuthGuard)
    create(
        @Body()
        createUserDTO: UserCreateDTO,
    ) {
        return this.usersService.signup(createUserDTO);
    }
}