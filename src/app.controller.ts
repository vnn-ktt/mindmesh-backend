import {UseGuards, Controller, Get, Query, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import {ParseIntPipe} from "./conception/parse-int.pipe";
import {AuthGuard} from "./conception/guard";
import {LoggingInterceptor} from "./conception/interceptor";

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    console.log(pageNumber);
    return this.appService.findAll();
  }
}
