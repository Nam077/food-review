import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'images', timestamps: true, comment: 'images table', updatedAt: true })
export class Image extends Model<Image> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'image id' })
    id: number;

    @Column({ comment: 'image name' })
    name: string;

    @Column({ comment: 'image url' })
    url: string;

    @Column({ comment: 'image status', defaultValue: true })
    status: boolean;

    @Column({ comment: 'image idUser' })
    idUser: number;
}
