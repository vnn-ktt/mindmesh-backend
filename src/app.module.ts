import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from "./conception/middleware";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NotesModule} from './notes/notes.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {LinksModule} from './links/links.module';

@Module({
    imports: [NotesModule, UsersModule, AuthModule, LinksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("");
    }
}
