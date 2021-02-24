const typeDef = `
    type Movie {
        id: ID!
        title: String!
        description: String!
        releaseDate: String!
        addedDate: String!
        duration: Int!
        actors: [String!]
        creator: User
        creatorname: String
        thumbnail: String!
        ratings: Int!
        ratingsAvg: Float!
        reviews: [Review!]!
    }

    extend type Query {
        movies: [Movie!]!
        movie(id: String!): Movie!
        usermovies(creatorname: String!): [Movie]!
    }

   

    extend type Mutation {
        createMovie(
            title: String!
            description: String!
            releaseDate: String!
            duration: Int!
            actors: [String!]
            thumbnail: String!
        ): Movie!
        
        editMovie(
            id: String!
            title: String
            description: String
            releaseDate: String
            duration: Int
            actors: [String]
            thumbnail: String
        ): Movie!

        deleteMovie(
            id: String!
        ): Boolean!
    }    
`;
export default typeDef;
