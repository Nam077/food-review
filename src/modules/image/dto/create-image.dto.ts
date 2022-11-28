import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
    @ApiProperty({ description: 'Name', example: 'Image Test' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        description: 'IdUser',
        example: '1',
    })
    @IsNumber({}, { message: 'IdUser must be a number' })
    @IsNotEmpty({ message: 'IdUser is required' })
    idUser: number;

    @ApiProperty({
        description: 'Url',
        example: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    })
    @IsString({ message: 'Url must be a string' })
    @IsNotEmpty({ message: 'Url is required' })
    @Matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/, { message: 'Url is not valid' })
    url: string;
}
