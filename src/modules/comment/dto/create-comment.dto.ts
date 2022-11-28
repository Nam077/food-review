import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IdPostExists } from '../../../decorators/validates/custom.validate';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ description: 'IdUser', example: 'Review Test' })
    @IsString({ message: 'Content must be a string' })
    @IsNotEmpty({ message: 'Content is required' })
    content: string;

    @ApiProperty({ description: 'IdPost', example: 1 })
    @IsNumber({}, { message: 'IdPost must be a number' })
    @IsNotEmpty({ message: 'IdPost must not be empty' })
    @IdPostExists({ message: 'IdPost does not exist' })
    idPost: number;

    @ApiProperty({ description: 'IdUser', example: 1 })
    @IsNumber({}, { message: 'IdUser must be a number' })
    @IsNotEmpty({ message: 'IdUser must not be empty' })
    @IdPostExists({ message: 'IdUser does not exist' })
    idUser: number;
}
