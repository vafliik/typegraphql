import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import { redis } from "./redis";


const main = async () => {
    
    await createConnection();

    const schema = await buildSchema({
        resolvers: [__dirname + '/modules/**/*.ts'],
        authChecker: ({ context: { req } },) => {
            return !!req.session.userId;
        }
    });


    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    });

    const app = Express();

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3000"
        })
    );

    const RedisStore = connectRedis(session);

    app.use(
        session({
            store: new RedisStore({
                client: redis,
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );


    apolloServer.applyMiddleware({ app })

    app.listen(4000, () => {
        console.log("Server running on http://localhost:4000/graphql");
    })
}

main();