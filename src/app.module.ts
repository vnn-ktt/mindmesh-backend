import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {LoggerMiddleware} from "./conception/middleware";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseService} from './database/database.service';
//import {NotesService} from './note/note.service';
import {NotesModule} from './notes/notes.module';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {LinksModule} from './links/links.module';
import {UsersController} from "./users/users.controller";

@Module({
    imports: [NotesModule, UsersModule, AuthModule, LinksModule],
    controllers: [AppController, UsersController],
    providers: [AppService, DatabaseService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("");
    }
}
