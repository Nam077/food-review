import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

export type TypeRate = 1 | 2 | 3 | 4 | 5;

@Table({ tableName: 'rates', timestamps: true, comment: 'rates table', updatedAt: true })
export class Rate extends Model<Rate> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'rate id' })
    id: number;

    @Column({ comment: 'rate type' })
    type: TypeRate;

    @Column({ comment: 'rate idUser' })
    idUser: number;

    @Column({ comment: 'rate idPost' })
    idPost: number;

    @Column({ comment: 'rate content', type: DataType.TEXT('tiny'), allowNull: true })
    content: string;

    @BelongsTo(() => User, 'idUser')
    user: User;

    @BelongsTo(() => Post, 'idPost')
    post: Post;
}
