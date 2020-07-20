import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Command extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    howTo!: string;

    @Field()
    @Column()
    line!: string;

    @Field()
    @Column()
    platform!: string;
}
