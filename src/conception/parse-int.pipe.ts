import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): number {
       const parsed = parseInt(value);
       console.log('pipe');
       if (Number.isNaN(parsed)) {
           throw new BadRequestException("Integer validation failed.");
       }
       return parsed;
    }
}