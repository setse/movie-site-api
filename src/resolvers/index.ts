import { currentUser, register, login } from "./auth";
import { createMovie, editMovie, deleteMovie, movies, movie } from "./movie";
import {addReview} from "./review"

const resolverMap = {
  Query: {
    currentUser,
    movies,
    movie
  },
  Mutation: {
    login,
    register,
    createMovie,
    editMovie,
    deleteMovie,
    addReview,
  },
};

export default resolverMap;
