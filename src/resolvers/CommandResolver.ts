import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Command } from '../entity/Command';

@Resolver()
export class CommandResolver {
    @Query(() => [Command], { nullable: true })
    async Commands(): Promise<Command[] | undefined> {
        return Command.find();
    }

    @Query(() => Command, { nullable: true })
    async CommandById(
        @Arg('id', () => Int) id: number
    ): Promise<Command | undefined> {
        return Command.findOne({
            where: {
                id,
            },
        });
    }
}
