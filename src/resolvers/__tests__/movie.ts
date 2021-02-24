import * as setup from "../../__tests__/setup";
import {createMovie, movies} from '../movie'
import { MovieModel } from '../../models/movie'
let testMongo: setup.TestMongoConn;

beforeEach(async () => {
    testMongo = await setup.beforeEach();
});

afterEach(() => setup.afterEach(testMongo));

describe("Creating movie test", () => {
  it("this should create a movie", async () => {
    const movie = await createMovie(
      undefined,
      {
        title: "Test Movie Title",
        duration: 69,
        releaseDate: "2020/06/05",
          actors: [],
          description: "This is a description",
          addedDate: "2020/05/05",
          creatorname: "Test Username",
        thumbnail:
          "https://i.kym-cdn.com/entries/icons/mobile/000/028/021/work.jpg",
        creator: "5fcb007c2260963878115c80",
      },
      {
        userInfo: {
          id: "5fcb007c2260963878115c80",
          username: "Test Username",
        },
      },
    );

    expect(movie).toBeDefined();
    expect(movie.title).toEqual("Test Movie Title");
  });


});


describe("Test getting all movies", () => {
  it("this should get all movies from the DB", async () => {
    const movieTest1 = new MovieModel({
        title: "Test 1",
        description: "This is description",
        addedDate: "2020/05/05",
          creatorname: "Test Username",
      duration: 69,
      releaseDate: "2020/04/20",
      actors: [],
      thumbnail:
        "https://i.kym-cdn.com/entries/icons/mobile/000/028/021/work.jpg",
      creator: "5fcb007c2260963878115c80",
    });

    const movieTest2 = new MovieModel({
        title: "Test 2",
        description: "This is description",
        addedDate: "2020/05/05",
          creatorname: "Test Username",
      duration: 42,
      releaseDate: "2020/04/20",
      actors: [],
      thumbnail:
        "https://i.kym-cdn.com/entries/icons/mobile/000/028/021/work.jpg",
      creator: "5fcb007c2260963878115c80",
    });

    await movieTest1.save();
    await movieTest2.save();

    const response = await movies(undefined);
    expect(response.length).toEqual(2);
    expect(response[0].title).toEqual("Test 1");
      expect(response[1].title).toEqual("Test 2");
      expect(response[0].description).toEqual("This is description");
      expect(response[1].description).toEqual("This is description");
  });
});