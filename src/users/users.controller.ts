import {Controller, Post, Request, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {AuthGuard} from "../auth/guards/auth.guard";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService) {
    }

    @UseGuards(AuthGuard)
    @Post('/profile')
    async getProfile(
        @Request() request: any
    ) {
        return request.user;
    }
}