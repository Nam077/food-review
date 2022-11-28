import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IdImageExists, IdUserExists } from '../../../decorators/validates/custom.validate';

export class CreateUserDetailDto {
    @ApiProperty({ description: 'IdUser', example: 1 })
    @IsString({ message: 'First name must be a string' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName: string;

    @ApiProperty({ description: 'Last name', example: 'Test' })
    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName: string;

    @ApiProperty({ description: 'Phone', example: '123456789' })
    @IsString({ message: 'Phone must be a string' })
    @IsNotEmpty({ message: 'Phone is required' })
    @Matches(/^[0-9]{10}$/, { message: 'Phone is not valid' })
    phone: string;

    @ApiProperty({ description: 'Address', example: 'Test' })
    @IsString({ message: 'Address must be a string' })
    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @ApiProperty({ description: 'idAvatar', example: 1 })
    @IsNumber({}, { message: 'idAvatar must be a number' })
    @IsNotEmpty({ message: 'idAvatar is required' })
    @IdImageExists({ message: 'idAvatar does not exist' })
    idAvatar: number;

    @ApiProperty({ description: 'IdUser', example: 1 })
    @IsNumber({}, { message: 'IdUser must be a number' })
    @IsNotEmpty({ message: 'IdUser is required' })
    @IdUserExists({ message: 'IdUser does not exist' })
    idUser: number;
}
