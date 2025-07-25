import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {TUserCreateDTO, TUserLoginDTO} from "../common/dto/user-dto";
import {TUserCreateResponse, TUserLoginResponse} from "../common/types/users/t.response";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post("register")
    register(
        @Body() userRegisterDTO:
        TUserCreateDTO
    ): Promise<TUserCreateResponse> {
        return this.authService.register(userRegisterDTO);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(
        @Body() userLoginDTO:
        TUserLoginDTO
    ): Promise<TUserLoginResponse> {
        return this.authService.login(userLoginDTO);
    }
}