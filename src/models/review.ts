import mongoose, {Schema} from 'mongoose'
import { MovieModel } from './movie'

export interface Review extends mongoose.Document {
    _id: string;
    comment: string;
    rating: number;
    movie: string;
    user: string;
}

const ReviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

ReviewSchema.index({ user: 1, movie: 1 }, { unique: true });

ReviewSchema.pre(/^find/, function (next) {
    (this as any).populate({
        path: "user",
        select: "username",
    });
    next();
});

ReviewSchema.statics.updateRatingMovie = async function (movieId: string) {
    const stats = await (this as any).aggregate([
        { $match: { movie: movieId } },
        {
            $group: {
                _id: "$movie",
                numberOfRating: { $sum: 1 },
                avgRating: { $avg: "$rating" }
            },
        },
    ]);

    if (stats.length > 0) {
        const doc = await MovieModel.findByIdAndUpdate(movieId, {
            ratings: stats[0].numberOfRating,
            ratingsAvg: stats[0].avgRating,
        });

        console.log(doc);
    } else {
        await MovieModel.findByIdAndUpdate(movieId, {
            ratings: 0,
            ratingsAvg: 0,
        });
    };
};

ReviewSchema.post("save", function (doc: Review) {
    (doc.constructor as any).updateRatingMovie(doc.movie);
});

export const ReviewModel = mongoose.model<Review>(
    "Review",
    ReviewSchema, "Reviews",
);