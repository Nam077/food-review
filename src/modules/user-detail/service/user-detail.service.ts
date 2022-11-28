import { Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from '../dto/create-user-detail.dto';
import { UpdateUserDetailDto } from '../dto/update-user-detail.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetail } from '../entities/user-detail.entity';

@Injectable()
export class UserDetailService {
    constructor(@InjectModel(UserDetail) private userDetailRepository: typeof UserDetail) {}

    async create(createUserDetailDto: CreateUserDetailDto): Promise<UserDetail> {
        return await this.userDetailRepository.create(createUserDetailDto);
    }

    async findAll(): Promise<UserDetail[]> {
        return this.userDetailRepository.findAll({ include: { all: true } });
    }

    async findOne(id: number): Promise<UserDetail> {
        return await this.userDetailRepository.findByPk(id, { include: { all: true } });
    }

    async update(id: number, updateUserDetailDto: UpdateUserDetailDto): Promise<UserDetail> {
        const userDetail: UserDetail = await this.findOne(id);
        return await userDetail.update(updateUserDetailDto);
    }

    async remove(id: number): Promise<UserDetail> {
        const userDetail: UserDetail = await this.findOne(id);
        await userDetail.destroy();
        return userDetail;
    }
}
