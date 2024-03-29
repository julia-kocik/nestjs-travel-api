import {
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      return await this.authService.signUp(authCredentialsDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new UnauthorizedException('Your registration failed, please try again');
      }
    }
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      return await this.authService.signIn(authCredentialsDto);
    } catch (error) {
      throw new UnauthorizedException('You have provided incorrect credentials')
    }
  }
}
