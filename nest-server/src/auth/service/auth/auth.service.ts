import { Injectable } from '@nestjs/common';
import { BaseUserDTO, SignInDTO, SignUpDTO } from '../../dto/auth.dto';
import { handleError } from 'src/common/error-handling/handle-error';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/custom-decorators/roles';

export const all_users = new Map<string, BaseUserDTO>();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(payload: SignInDTO) {
    const isAdmin = payload.email.indexOf('admin') !== -1;
    const role = isAdmin ? Role.Admin : Role.User;
    let isMatch = false;
    if (isAdmin) {
      isMatch =
        payload.email === 'admin@mail.com' && payload.password === 'qwerty';
    } else if (all_users.has(payload.email)) {
      const hash = all_users.get(payload.email)?.password || '';
      isMatch = await bcrypt.compare(payload.password, hash);
    }
    if (isMatch) {
      return {
        token: await this.jwtService.signAsync({
          ...payload,
          role,
        }),
        role,
      };
    }
    return handleError(401, 'Invalid Credentials');
  }
  async signUp(payload: SignUpDTO) {
    if (all_users.has(payload.email)) {
      return handleError(422, 'Email Already Registered');
    }
    const { email, fullName, age, password } = payload;
    const _id = crypto.randomUUID();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    all_users.set(email, {
      email,
      fullName,
      age,
      password: hashedPassword,
      _id,
    });
    return 'User Registered';
  }
}
