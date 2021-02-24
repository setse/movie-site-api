import mongoose ,{ Schema } from "mongoose";

export interface Movie extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  releaseDate: string;
  addedDate: Date;
  duration: number;
  actors: [string];
  creator: string;
  creatorname: string;
  thumbnail: string;  
  ratings: number;
  ratingsAvg: number; 
}

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: String, required: true },
    addedDate: { type: String, required: true },
    duration: { type: Number, required: true },
    actors: { type: [String], required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    creatorname: { type: Schema.Types.String, ref: "User", required: true },
    thumbnail: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    ratingsAvg: { type: Number, default: 0.0, min: 0, max: 5 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

MovieSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "movie",
  localField: "_id",
});

MovieSchema.pre(/^find/, function (next) {
  (this as any).populate({
    path: "author",
    select: "username",
  });
  next();
});

export const MovieModel = mongoose.model<Movie>("Movie", MovieSchema, "Movies");
