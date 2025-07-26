import {BadRequestException, Injectable, PipeTransform, ValidationError} from '@nestjs/common';
import {validate} from 'class-validator';
import {plainToInstance} from 'class-transformer';
import {UserLoginDTO} from '../../common/dto/user-dto';

@Injectable()
export class AuthValidationPipe implements PipeTransform {
    async transform(value: any) {
        const object = plainToInstance(UserLoginDTO, value);
        const errors = await validate(object, {
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
            const errorMessages = this.flattenValidationErrors(errors);
            throw new BadRequestException({
                message: 'Validation failed',
                errors: errorMessages,
            });
        }

        return object;
    }

    private flattenValidationErrors(errors: ValidationError[]): string[] {
        return errors.flatMap(error => {
            if (error.constraints) {
                return Object.values(error.constraints);
            }
            if (error.children && error.children.length > 0) {
                return this.flattenValidationErrors(error.children);
            }
            return [];
        });
    }
}