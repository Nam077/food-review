import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/modules/post/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'comments', timestamps: true, comment: 'comments table', updatedAt: true })
export class Comment extends Model<Comment> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'comment id' })
    id: number;

    @Column({ comment: 'comment content', type: DataType.TEXT('medium') })
    content: string;

    @Column({ comment: 'comment idUser' })
    idUser: number;

    @Column({ comment: 'comment idPost' })
    idPost: number;

    @Column({ comment: 'comment status', defaultValue: true })
    status: boolean;

    @BelongsTo(() => User, 'idUser')
    user: User;

    @BelongsTo(() => Post, 'idPost')
    post: Post;
}
