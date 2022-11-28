import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Image } from '../../image/entities/image.entity';

@Table({ tableName: 'user_details', timestamps: true, comment: 'user details table', updatedAt: true })
export class UserDetail extends Model<UserDetail> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'user detail id' })
    id: number;

    @Column({ comment: 'user detail first name' })
    firstName: string;

    @Column({ comment: 'user detail last name' })
    lastName: string;

    @Column({ comment: 'user detail phone number' })
    phoneNumber: string;

    @Column({ comment: 'user detail address' })
    address: string;

    @Column({ comment: 'user detail city' })
    city: string;

    @Column({ comment: 'user detail idUser' })
    idUser: number;

    @Column({ comment: 'user detail avatar' })
    idAvatar: number;

    @BelongsTo(() => User, 'idUser')
    user: User;

    @BelongsTo(() => Image, 'idImage')
    avatar: Image;
}
