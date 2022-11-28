import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { EmailIsUnique } from '../../../decorators/validates/custom.validate';

export class RegisterDto {
    @ApiProperty({ description: 'Email', example: 'test@test.com' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail({}, { message: 'Email is not valid' })
    @EmailIsUnique({ message: 'Email is already in use' })
    email: string;

    @ApiProperty({ description: 'Password of user', example: 'Test123456' })
    @IsString({ message: 'Password must be a string' })
    password: string;

    @ApiProperty({ description: 'Name of user', example: 'Test' })
    @IsString({ message: 'Name must be a string' })
    name: string;
}
