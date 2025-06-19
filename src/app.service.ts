import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findAll(): Array<String> {
    console.log("Controller...");
    return ['Note 1', 'Note 2', 'Note 3', 'Note 4'];
  }
}
