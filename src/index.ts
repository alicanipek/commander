import Express from 'express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { CommandResolver } from './resolvers/CommandResolver';
import { ApolloServer } from 'apollo-server-express';
console.log('it works');

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [CommandResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        playground: true,
    });

    const app = Express();

    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server started');
    });
};

main().catch((err) => console.error(err));
