import {
    Controller,
    Query,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { AppService } from './app.service';
import { ParseIntPipe } from "./conception/parse-int.pipe";
import { AuthGuard } from "./conception/guard";
import { LoggingInterceptor } from "./conception/interceptor";
import { Note as NoteModel } from '@prisma/client';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    //return this.appService.findAll();
  }
}
