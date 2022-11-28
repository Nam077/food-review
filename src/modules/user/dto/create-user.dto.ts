import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'Name', example: 'Review Test' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ description: 'Email', example: 'test@test.com' })
    @IsEmail({}, { message: 'Email is not valid' })
    @IsString({ message: 'Email must be a string' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ description: 'Password', example: '123456' })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty({ description: 'Role', example: 'admin' })
    @IsString({ message: 'Role must be a string' })
    @IsNotEmpty({ message: 'Role is required' })
    @Matches(/^(admin|user)$/, { message: 'Role is not valid' })
    role: string;
}
