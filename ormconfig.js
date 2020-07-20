module.exports = {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
    synchronize: true,
    entities: ['src/entity/**/*.ts'],
};
