import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MinLength,
} from 'class-validator';

export class SignInDTO {
  @ApiProperty({ example: 'adi@mail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;
}
export class SignUpDTO {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNumberString()
  age: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class BaseUserDTO extends SignUpDTO {
  @ApiProperty()
  _id: string;
}
