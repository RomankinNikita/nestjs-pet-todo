import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com', description: 'User email' })
  @IsString({ message: 'Should be string' })
  @IsEmail({}, { message: 'Incorrect email address' })
  readonly email: string;

  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString({ message: 'Should be string' })
  @Length(4, 16, { message: 'Not less 4 and not more 16 symbols' })
  readonly password: string;
}
