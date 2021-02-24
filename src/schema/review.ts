const typeDef = `
    type Review {
        id: ID!
        rating: Int!
        comment: String!
        movie: String!
        user: User!
    }


    extend type Mutation {
        addReview(rating: Int!, comment: String!, movie: String!): Review!
    }    
`;
export default typeDef;