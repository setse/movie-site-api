import { ReviewModel } from "../models/review";
import { Context, ReviewResponse } from "../types"

export async function addReview(_: void, args: any, ctx: Context | null): Promise<ReviewResponse> {

    const { comment, rating, movie } = args;
    const review = new ReviewModel({
        comment,
        rating,
        movie,
        user: (ctx as Context).userInfo.id,
    });

    await review.save();
    return review;
}