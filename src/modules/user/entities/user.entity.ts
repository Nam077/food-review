import { Table, Model, Column, DataType, BeforeCreate, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import { UserDetail } from '../../user-detail/entities/user-detail.entity';
import { Post } from '../../post/entities/post.entity';
import { Reaction } from '../../reaction/entities/reaction.entity';
import { Rate } from '../../rate/entities/rate.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Table({ tableName: 'users', timestamps: true, comment: 'users table', updatedAt: true })
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'user id' })
    id: number;

    @Column({ comment: 'user name' })
    name: string;

    @Column({ comment: 'user email', unique: true })
    email: string;

    @Column({ comment: 'user password', type: DataType.TEXT('tiny') })
    password: string;

    @Column({ comment: 'user role', defaultValue: 'user' })
    role: string;

    @Column({ comment: 'user status', defaultValue: true })
    status: boolean;

    @BeforeCreate
    static async lowercaseEmail(instance: User) {
        instance.email = instance.email.toLowerCase();
    }

    @HasOne(() => UserDetail, 'idUser')
    userDetail: UserDetail;

    @HasMany(() => Comment, 'idUser')
    comments: Comment[];

    @HasMany(() => Post, 'idUser')
    posts: Post[];

    @HasMany(() => Reaction, 'idUser')
    reactions: Reaction[];

    @HasMany(() => Rate, 'idUser')
    rates: Rate[];
}
