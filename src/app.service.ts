import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {
    const port = this.configService.get<number>('PORT');
    console.log('server is running on port ' + port);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
