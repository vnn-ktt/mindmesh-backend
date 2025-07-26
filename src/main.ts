import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    // app.useGlobalPipes(new ValidationPipe({
    //     enableDebugMessages: true,
    //     transform: true,
    //
    //     /* Ошибка при наличии невалидных свойств
    //      * forbidNonWhitelisted: true, */
    //
    //     /* Удаление невалидных свойств
    //      * whitelist: true, */
    // }));
    await app.listen(process.env.PORT ?? 4200);
}

bootstrap();
