import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
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

    @Mutation(() => Command, { nullable: true })
    async AddCommand(
        @Arg('howTo') howTo: string,
        @Arg('line') line: string,
        @Arg('platform') platform: string
    ): Promise<Command | undefined> {
        const command = Command.create({
            howTo,
            line,
            platform,
        }).save();

        return command;
    }

    @Mutation(() => Command, { nullable: true })
    async UpdateCommand(
        @Arg('id', () => Int) id: number,
        @Arg('howTo') howTo: string,
        @Arg('line') line: string,
        @Arg('platform') platform: string
    ): Promise<Command | undefined> {
        let newCommand = await Command.findOneOrFail({ id });
        if (howTo !== undefined && howTo !== null) {
            newCommand.howTo = howTo;
        }
        if (line !== undefined && line !== null) {
            newCommand.line = line;
        }
        if (platform !== undefined && platform !== null) {
            newCommand.platform = platform;
        }
        return await newCommand.save();
    }
}
