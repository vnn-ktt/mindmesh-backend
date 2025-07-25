import {Controller, UseInterceptors} from '@nestjs/common';

import {AppService} from './app.service';
import {LoggingInterceptor} from "./conception/interceptor";

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
    constructor(
        private readonly appService: AppService) {
    }
}
