import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    this.authService.signup(authCredentialsDto);
  }
}
