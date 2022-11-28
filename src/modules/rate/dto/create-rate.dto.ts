import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IdPostExists, IdUserExists } from '../../../decorators/validates/custom.validate';
import { ApiProperty } from '@nestjs/swagger';
import { TypeRate } from '../entities/rate.entity';

export class CreateRateDto {
    @ApiProperty({ description: 'IdUser', example: 1 })
    @IsNumber({}, { message: 'IdUser must be a number' })
    @IsNotEmpty({ message: 'IdUser is required' })
    @IdUserExists({ message: 'IdUser does not exist' })
    idUser: number;

    @ApiProperty({ description: 'IdPost', example: 1 })
    @IsNumber({}, { message: 'IdPost must be a number' })
    @IdPostExists({ message: 'IdPost does not exist' })
    idPost: number;

    @ApiProperty({ description: 'Rate', example: 1 })
    @IsNumber({}, { message: 'Rate must be a number' })
    @IsNotEmpty({ message: 'Rate is required' })
    type: TypeRate;

    @ApiProperty({ description: 'Content', example: 'Rate Test' })
    @IsString({ message: 'Content must be a string' })
    @IsNotEmpty({ message: 'Content is required' })
    content: string;
}
