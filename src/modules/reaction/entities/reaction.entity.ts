import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

export type TypeReaction = 'like' | 'dislike' | 'love' | 'haha' | 'wow' | 'sad' | 'angry';

@Table({ tableName: 'reactions', timestamps: true, comment: 'reactions table', updatedAt: true })
export class Reaction extends Model<Reaction> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'reaction id' })
    id: number;

    @Column({ comment: 'reaction type' })
    type: TypeReaction;

    @Column({ comment: 'reaction idUser' })
    idUser: number;

    @Column({ comment: 'reaction idPost' })
    idPost: number;

    @BelongsTo(() => User, 'idUser')
    user: User;

    @BelongsTo(() => Post, 'idPost')
    post: Post;
}
