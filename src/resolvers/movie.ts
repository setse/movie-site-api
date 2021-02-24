
import {Movie, MovieModel} from '../models/movie';
import { MovieResponse, Context } from '../types';




export async function movies(_: void): Promise<MovieResponse[]> {
    
    return await MovieModel.find();
  }

export async function movie(_: void, args: any): Promise<MovieResponse>{
    const movie = await MovieModel.findById(args.id).populate("reviews");

    if (movie === null) {
        throw new Error('No Movie Found With Submitted ID');
    }
    return movie;
}

export async function usermovies(_: void, args: any): Promise<MovieResponse[]>{
    
    return await MovieModel.find().sort(args.creatorname);
}


export async function createMovie(_: void, args: any, ctx: Context | null): Promise<Movie>{
   

    const {title,
           description,
           releaseDate,
           duration, 
        actors,  
            thumbnail} = args;

   //const {userInfo} = ctx;

    const movie: Movie = new MovieModel({
        title,
        description,
        releaseDate,
        addedDate: new Date().toISOString(),
        duration,
        actors,
        creator: (ctx as Context).userInfo.id,
        creatorname: (ctx as Context).userInfo.username,
        thumbnail,
    });
    
    await movie.save();
    return movie;
    
}

export async function editMovie(_: void, args: any): Promise<Movie>{

    const { id } = args;

    const movie: Movie | null = await MovieModel.findByIdAndUpdate(id, args, {
        new: true,
        runValidators: true,
    });

    if(movie === null) {
        throw new Error("Check ID and try again.");
    }

    return movie;
}

export async function deleteMovie(_: void, args: any): Promise<Boolean>{

    const { id } = args;

    const movie: Movie | null = await MovieModel.findByIdAndDelete(id);

    if(movie === null){
        throw new Error("Deletion Failed. Check ID and try again.");
    }

    return true;
}