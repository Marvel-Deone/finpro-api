import { IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsString()
  identity: string

  @IsString()
  @MinLength(6)
  password: string
}