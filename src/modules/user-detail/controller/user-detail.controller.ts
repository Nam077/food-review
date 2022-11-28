import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDetailDto } from '../dto/create-user-detail.dto';
import { UserDetailService } from '../service/user-detail.service';
import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User Detail')
@Controller('user-detail')
export class UserDetailController {
    constructor(private readonly userDetailService: UserDetailService) {}

    @Post()
    @ApiOperation({ summary: 'Create user detail' })
    create(@Body() createUserDetailDto: CreateUserDetailDto) {
        return this.userDetailService.create(createUserDetailDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all user details' })
    findAll() {
        return this.userDetailService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user detail by id' })
    findOne(@Param('id') id: string) {
        return this.userDetailService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update user detail by id' })
    update(@Param('id') id: string, @Body() updateUserDetailDto: UpdateUserDetailDto) {
        return this.userDetailService.update(+id, updateUserDetailDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user detail by id' })
    remove(@Param('id') id: string) {
        return this.userDetailService.remove(+id);
    }
}
