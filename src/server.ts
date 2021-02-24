import mongoose from "mongoose";
import yargs from "yargs";
import { ApolloServer } from "apollo-server";
import { getUserInfo } from "./auth";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const args = yargs.option("mongo-uri", {
  describe: "Mongo URI",
  default: "mongodb+srv://sets:admin@cluster0.dapko.mongodb.net/collection?retryWrites=true&w=majority",
  type: "string",
  group: "Mongo",
}).argv;


async function start() {
  try {
    await mongoose.connect(args["mongo-uri"], {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
    console.log("Connected to DB.");

    await new ApolloServer({
      typeDefs: typeDefs as string[],
      resolvers,
      context: ({ req }) => ({
        userInfo: getUserInfo(req.headers.authorization || ""),
      }),
    }).listen(8000);
    console.log("GraphQl API running on port 8000.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();

