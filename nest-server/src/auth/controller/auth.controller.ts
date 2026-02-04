import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from '../dto/auth.dto';
import { AuthService } from '../service/auth/auth.service';
import { handleError } from 'src/common/error-handling/handle-error';
import { ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/common/custom-decorators/skip-auth';

@Controller('auth')
/**
 * Controller for handling authentication operations.
 *
 * Provides endpoints for user sign-in and sign-up functionality.
 * Validates incoming request payloads before delegating to the authentication service.
 *
 * @class AuthController
 */
export class AuthController {
  constructor(private _authService: AuthService) {}

  /**
   * @Endpoint : signin.
   * @description : login for user.
   * @params {payload: SignInDTO}.
   * @RequestMethod :  POST.
   * @return : token or error.
   */
  @ApiOperation({ summary: 'This endpoint is for signing in the user' })
  @SkipAuth()
  @Post('signin')
  async signIn(
    @Body() payload: SignInDTO,
  ): Promise<{ token: string; role: string } | undefined> {
    //? validate first and then invoke the service
    if (!payload.email.length || !payload.password.length)
      return handleError(
        HttpStatus.BAD_REQUEST,
        'Email and Password are required',
      );
    return await this._authService.signIn(payload);
  }

  /**
   * @Endpoint : signup.
   * @description : register a new user.
   * @params {payload: SignUpDTO}.
   * @RequestMethod :  POST.
   * @return : success message or error.
   */
  @ApiOperation({ summary: 'This endpoint is for registering the user' })
  @SkipAuth()
  @Post('signup')
  async signUp(@Body() payload: SignUpDTO): Promise<string> {
    if (
      !payload.email.length ||
      !payload.password.length ||
      !payload.fullName.length ||
      !payload.age
    )
      return handleError(HttpStatus.BAD_REQUEST, 'All fields are required');
    return await this._authService.signUp(payload);
  }
}
