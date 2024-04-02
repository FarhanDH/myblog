import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from './core/auth/guards/jwt.guard';

@Controller()
export class AppController {
  @UseGuards(JwtGuard)
  @Get()
  getHello(@Request() req): string {
    console.log(req.user);
    return 'oke';
  }
}
