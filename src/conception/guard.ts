import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const isAuth = true;
        if (!isAuth) {
            throw new UnauthorizedException("Not authorized user!");
        }
        return true;
    }
}