import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        console.log('guard');
        const request = context.switchToHttp().getRequest();
        const isAuth = true;
        if(!isAuth){
            throw new UnauthorizedException("Not authorized user!");
        }
        return true;
    }
}