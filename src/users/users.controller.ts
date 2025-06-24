import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserDTO} from "./dto/create-user-dto";

@Controller('users')
export class UsersController {
    @Post('/signup')
    create(
        @Body()
        createUserDTO: CreateUserDTO,
    ) {
        return createUserDTO;
    }
}