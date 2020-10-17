import { Command } from './../entity/Command';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@Resolver()
export class CommandResolver {
    @Query(() => [Command], { nullable: true })
    async Commands(): Promise<Command[] | undefined> {
        const CommandRepository = getRepository(Command);

        return CommandRepository.find();
    }

    @Query(() => Command, { nullable: true })
    async CommandById(
        @Arg('id', () => Int) id: number
    ): Promise<Command | undefined> {
        const CommandRepository = getRepository(Command);

        return CommandRepository.findOne({
            id,
        });
    }

    @Query(() => [Command], { nullable: true })
    async CommandsByPlatform(
        @Arg('platform', () => String) platform: string
    ): Promise<Command[] | undefined> {
        const CommandRepository = getRepository(Command);

        return CommandRepository.find({
            platform: platform,
        });
    }

    @Mutation(() => Command, { nullable: true })
    async AddCommand(
        @Arg('howTo') howTo: string,
        @Arg('line') line: string,
        @Arg('platform') platform: string
    ): Promise<Command | undefined> {
        const CommandRepository = getRepository(Command);

        const command = await CommandRepository.save({
            howTo,
            line,
            platform,
        });

        return command;
    }

    @Mutation(() => Command, { nullable: true })
    async UpdateCommand(
        @Arg('id', () => Int) id: number,
        @Arg('howTo') howTo: string,
        @Arg('line') line: string,
        @Arg('platform') platform: string
    ): Promise<Command | undefined> {
        const CommandRepository = getRepository(Command);

        let newCommand = await CommandRepository.update(id, {
            howTo,
            line,
            platform,
        });
        console.log(newCommand);
        return CommandRepository.findOne({ id });
    }

    @Mutation(() => Boolean)
    async DeleteCommand(@Arg('id', () => Int) id: number): Promise<Boolean> {
        const CommandRepository = getRepository(Command);

        let result = await CommandRepository.delete({ id });
        return result.affected != null && result.affected >= 0;
    }
}
